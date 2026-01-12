import { Whop } from "@whop/sdk";
import type { Request, Response, NextFunction } from "express";

const WHOP_API_KEY = process.env.WHOP_API_KEY;
const WHOP_APP_ID = process.env.WHOP_APP_ID;

export const whopSdk = WHOP_API_KEY && WHOP_APP_ID
  ? new Whop({ apiKey: WHOP_API_KEY, appId: WHOP_APP_ID })
  : null;

if (!WHOP_API_KEY || !WHOP_APP_ID) {
  console.warn("Whop SDK not initialized - missing WHOP_API_KEY or WHOP_APP_ID");
}

export interface WhopUserToken {
  userId: string;
}

export async function verifyWhopUserToken(
  headers: Record<string, string | string[] | undefined>
): Promise<WhopUserToken | null> {
  if (!whopSdk) {
    return null;
  }

  const tokenHeader = headers["x-whop-user-token"];
  if (!tokenHeader) {
    return null;
  }

  const token = Array.isArray(tokenHeader) ? tokenHeader[0] : tokenHeader;
  if (!token) {
    return null;
  }

  try {
    const result = await whopSdk.verifyUserToken(token, { dontThrow: true });
    if (result && result.userId) {
      return {
        userId: result.userId,
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

export interface WhopRequest extends Request {
  whopUser?: WhopUserToken;
  experienceId?: string;
  companyId?: string;
}

export async function whopAuthMiddleware(
  req: WhopRequest,
  res: Response,
  next: NextFunction
) {
  const user = await verifyWhopUserToken(req.headers as Record<string, string | string[] | undefined>);
  if (user) {
    req.whopUser = user;
    
    // Only log for API routes and page navigations, not static assets
    const path = req.path;
    const isApiRoute = path.startsWith('/api/');
    const isPageRoute = path.startsWith('/experiences/') || path.startsWith('/dashboard/');
    const isStaticAsset = path.includes('.') || path.startsWith('/@') || path.startsWith('/src/') || path.startsWith('/node_modules/');
    
    if ((isApiRoute || isPageRoute) && !isStaticAsset) {
      console.log(`[Whop] User ${user.userId} authenticated for ${req.method} ${path}`);
    }
  }

  const experienceId = req.query.experienceId || req.params.experienceId;
  if (experienceId) {
    req.experienceId = experienceId as string;
  }

  const companyId = req.query.companyId || req.params.companyId;
  if (companyId) {
    req.companyId = companyId as string;
  }

  next();
}

export function requireWhopAuth(
  req: WhopRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.whopUser) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}

export async function checkAccess(
  resourceId: string,
  userId: string
): Promise<{ hasAccess: boolean; accessLevel: "customer" | "admin" | "no_access" }> {
  if (!whopSdk) {
    console.warn("Whop SDK not initialized - denying access for security");
    return { hasAccess: false, accessLevel: "no_access" };
  }

  try {
    const response = await whopSdk.users.checkAccess(resourceId, { id: userId });

    return {
      hasAccess: response.has_access ?? false,
      accessLevel: (response.access_level as "customer" | "admin" | "no_access") ?? "no_access",
    };
  } catch (error) {
    console.error("Failed to check access:", error);
    return { hasAccess: false, accessLevel: "no_access" };
  }
}

export interface WhopUserProfile {
  id: string;
  username: string;
  name: string | null;
  bio: string | null;
  profilePictureUrl: string | null;
}

export async function getWhopUserProfile(userId: string): Promise<WhopUserProfile | null> {
  // First, try using the SDK (requires users.read permission)
  if (whopSdk) {
    try {
      const user = await whopSdk.users.retrieve(userId);
      
      return {
        id: user.id,
        username: user.username,
        name: user.name ?? null,
        bio: user.bio ?? null,
        profilePictureUrl: user.profile_picture?.url ?? null,
      };
    } catch (error: any) {
      // If it's a 401/403 error, the app doesn't have users.read permission
      // Try the public API as fallback
      if (error?.status === 401 || error?.status === 403) {
        console.log("SDK users.retrieve requires permission - trying public API fallback");
      } else {
        console.error("Failed to fetch Whop user profile via SDK:", error);
      }
    }
  }

  // Fallback: Try fetching from the public Whop API
  // This endpoint can retrieve public user data by userId
  try {
    const response = await fetch(`https://api.whop.com/api/v1/users/${userId}`);
    
    if (response.ok) {
      const user = await response.json();
      
      return {
        id: user.id || userId,
        username: user.username || "unknown",
        name: user.name ?? null,
        bio: user.bio ?? null,
        profilePictureUrl: user.profile_picture?.url ?? null,
      };
    } else {
      console.log(`Public API returned ${response.status} for user ${userId}`);
    }
  } catch (error) {
    console.error("Failed to fetch Whop user profile via public API:", error);
  }

  return null;
}
