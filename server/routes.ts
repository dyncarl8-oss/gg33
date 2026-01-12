import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage, generateOdisId } from "./storage";
import { whopAuthMiddleware, requireWhopAuth, checkAccess, getWhopUserProfile, type WhopRequest } from "./whop";
import { generatePersonalityInsights, generateDailyEnergy, generateCompatibilityInsights, generateChatResponse, generateChatResponseWithContext, generateChatResponseStream, buildUserContext, type UserNumerologyProfile, type CompatibilityProfile, type ChatMessage } from "./gemini";
import { parsedCues, totalCuesCount, type ParsedCue } from "./cuesData";
import { Resend } from 'resend';

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use(whopAuthMiddleware);

  // Get current user profile by odisId
  app.get("/api/profile/:odisId", async (req, res) => {
    const { odisId } = req.params;
    
    try {
      const user = await storage.getUserByOdisId(odisId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ user });
    } catch (error) {
      console.error("Error getting profile:", error);
      res.status(500).json({ error: "Failed to get profile" });
    }
  });

  // Create new user profile (generates odisId)
  app.post("/api/profile", async (req: WhopRequest, res) => {
    const { fullName, birthDate, birthTime, birthLocation } = req.body;
    
    if (!fullName || !birthDate) {
      return res.status(400).json({ error: "Missing required fields: fullName and birthDate" });
    }

    try {
      const odisId = generateOdisId();
      const whopUserId = req.whopUser?.userId;
      
      // If we have a Whop user, fetch their profile
      let whopUsername: string | undefined;
      let whopProfilePictureUrl: string | undefined;
      let whopAccessLevel: 'customer' | 'admin' | 'no_access' | undefined;
      
      if (whopUserId) {
        const whopProfile = await getWhopUserProfile(whopUserId);
        if (whopProfile) {
          whopUsername = whopProfile.username;
          whopProfilePictureUrl = whopProfile.profilePictureUrl ?? undefined;
        }
        
        // Check access level if we have an experience ID
        if (req.experienceId) {
          const access = await checkAccess(req.experienceId, whopUserId);
          whopAccessLevel = access.accessLevel;
        }
      }
      
      const user = await storage.createUser({
        odisId,
        fullName,
        birthDate: new Date(birthDate),
        birthTime,
        birthLocation,
        whopUserId,
        whopUsername,
        whopProfilePictureUrl,
        whopAccessLevel,
      });
      res.json({ success: true, user });
    } catch (error) {
      console.error("Error creating profile:", error);
      res.status(500).json({ error: "Failed to create profile" });
    }
  });

  // Get user by Whop ID (protected - only own profile)
  app.get("/api/profile/whop/:whopUserId", requireWhopAuth, async (req: WhopRequest, res) => {
    const { whopUserId } = req.params;
    
    // Users can only access their own profile
    if (req.whopUser!.userId !== whopUserId) {
      return res.status(403).json({ error: "You can only access your own profile" });
    }
    
    try {
      const user = await storage.getUserByWhopId(whopUserId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ user });
    } catch (error) {
      console.error("Error getting user by Whop ID:", error);
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  // Get current authenticated Whop user's profile (or create placeholder)
  app.get("/api/me", async (req: WhopRequest, res) => {
    const whopUserId = req.whopUser?.userId;
    
    if (!whopUserId) {
      return res.status(401).json({ error: "Not authenticated with Whop" });
    }
    
    try {
      // Check if user exists in our database
      let user = await storage.getUserByWhopId(whopUserId);
      
      if (user) {
        // User exists, sync their Whop profile and access level
        const whopProfile = await getWhopUserProfile(whopUserId);
        
        // Check current access level only if experienceId is available
        let whopAccessLevel: 'customer' | 'admin' | 'no_access' | undefined;
        if (req.experienceId) {
          const access = await checkAccess(req.experienceId, whopUserId);
          whopAccessLevel = access.accessLevel;
        }
        
        // Build update payload with only fields that have actual values
        const updatePayload: { whopUsername?: string; whopProfilePictureUrl?: string; whopAccessLevel?: 'customer' | 'admin' | 'no_access' } = {};
        
        if (whopProfile?.username && whopProfile.username !== user.whopUsername) {
          updatePayload.whopUsername = whopProfile.username;
        }
        if (whopProfile?.profilePictureUrl && whopProfile.profilePictureUrl !== user.whopProfilePictureUrl) {
          updatePayload.whopProfilePictureUrl = whopProfile.profilePictureUrl;
        }
        if (whopAccessLevel && whopAccessLevel !== user.whopAccessLevel) {
          updatePayload.whopAccessLevel = whopAccessLevel;
        }
        
        // Only update if there are actual changes
        if (Object.keys(updatePayload).length > 0) {
          const updated = await storage.updateWhopProfile(whopUserId, updatePayload);
          if (updated) user = updated;
        }
        
        res.json({ user, needsOnboarding: false });
      } else {
        // User doesn't exist yet - they need to complete onboarding
        const whopProfile = await getWhopUserProfile(whopUserId);
        res.json({ 
          user: null, 
          needsOnboarding: true,
          whopProfile: whopProfile ? {
            whopUserId,
            username: whopProfile.username,
            profilePictureUrl: whopProfile.profilePictureUrl,
          } : { whopUserId }
        });
      }
    } catch (error) {
      console.error("Error getting current user:", error);
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  // Update existing user profile
  app.put("/api/profile/:odisId", async (req, res) => {
    const { odisId } = req.params;
    const { fullName, birthDate, birthTime, birthLocation } = req.body;

    try {
      const user = await storage.updateUser(odisId, {
        fullName,
        birthDate: birthDate ? new Date(birthDate) : undefined,
        birthTime,
        birthLocation,
      });
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json({ success: true, user });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  // Get daily energy reading for a user on a specific date
  app.get("/api/daily-energy/:odisId/:date", async (req, res) => {
    const { odisId, date } = req.params;
    
    try {
      const energy = await storage.getDailyEnergy(odisId, date);
      if (!energy) {
        return res.status(404).json({ error: "No reading found for this date" });
      }
      res.json({ energy });
    } catch (error) {
      console.error("Error getting daily energy:", error);
      res.status(500).json({ error: "Failed to get daily energy" });
    }
  });

  // Generate and save daily energy reading
  app.post("/api/daily-energy", async (req, res) => {
    const { odisId, profile, personalDayNumber, universalDayNumber, energyScore, todayDate, date } = req.body;
    
    if (!odisId || !profile || !personalDayNumber || !universalDayNumber || !date) {
      return res.status(400).json({ error: "Missing required data" });
    }

    try {
      // First check if we already have a reading for today
      const existing = await storage.getDailyEnergy(odisId, date);
      if (existing) {
        return res.json({ energy: existing, cached: true });
      }

      // Generate new reading using AI
      const aiReading = await generateDailyEnergy(profile, personalDayNumber, universalDayNumber, todayDate);
      
      // Save to database
      const savedEnergy = await storage.saveDailyEnergy({
        odisId,
        date,
        personalDayNumber,
        universalDayNumber,
        energyScore: energyScore || 50,
        theme: aiReading.theme,
        description: aiReading.description,
        dos: aiReading.dos,
        donts: aiReading.donts,
        focusArea: aiReading.focusArea,
        affirmation: aiReading.affirmation,
      });
      
      res.json({ energy: savedEnergy, cached: false });
    } catch (error) {
      console.error("Error generating/saving daily energy:", error);
      res.status(500).json({ error: "Failed to generate daily energy" });
    }
  });

  // Get personality insight for a user
  app.get("/api/personality/:odisId", async (req, res) => {
    const { odisId } = req.params;
    
    try {
      const insight = await storage.getPersonalityInsight(odisId);
      if (!insight) {
        return res.status(404).json({ error: "No personality insight found" });
      }
      res.json({ insight });
    } catch (error) {
      console.error("Error getting personality insight:", error);
      res.status(500).json({ error: "Failed to get personality insight" });
    }
  });

  // Generate and save personality insight
  app.post("/api/personality", async (req, res) => {
    const { odisId, profile } = req.body;
    
    if (!odisId || !profile) {
      return res.status(400).json({ error: "Missing required data" });
    }

    try {
      // First check if we already have an insight
      const existing = await storage.getPersonalityInsight(odisId);
      if (existing) {
        return res.json({ insight: existing, cached: true });
      }

      // Generate new insight using AI
      const aiInsight = await generatePersonalityInsights(profile);
      
      // Save to database
      const savedInsight = await storage.savePersonalityInsight({
        odisId,
        overview: aiInsight.overview,
        strengths: aiInsight.strengths,
        challenges: aiInsight.challenges,
        lifeLesson: aiInsight.lifeLesson,
        careerPaths: aiInsight.careerPaths,
        relationshipStyle: aiInsight.relationshipStyle,
        spiritualGifts: aiInsight.spiritualGifts,
        profileSnapshot: {
          fullName: profile.name,
          birthDate: profile.birthDate,
          lifePathNumber: profile.lifePathNumber,
          expressionNumber: profile.expressionNumber,
          soulUrgeNumber: profile.soulUrgeNumber,
          westernZodiac: profile.westernZodiac,
          chineseZodiac: profile.chineseZodiac,
        },
      });
      
      res.json({ insight: savedInsight, cached: false });
    } catch (error) {
      console.error("Error generating/saving personality insight:", error);
      res.status(500).json({ error: "Failed to generate personality insight" });
    }
  });

  app.get("/api/access/:resourceId", requireWhopAuth, async (req: WhopRequest, res) => {
    const { resourceId } = req.params;
    const userId = req.whopUser!.userId;

    const access = await checkAccess(resourceId, userId);
    res.json(access);
  });

  app.get("/api/whop/user/:userId", requireWhopAuth, async (req: WhopRequest, res) => {
    const { userId } = req.params;
    
    if (req.whopUser!.userId !== userId) {
      return res.status(403).json({ error: "You can only access your own profile" });
    }
    
    try {
      const whopProfile = await getWhopUserProfile(userId);
      if (!whopProfile) {
        return res.status(404).json({ error: "Whop user not found" });
      }
      res.json({ profile: whopProfile });
    } catch (error) {
      console.error("Error fetching Whop user profile:", error);
      res.status(500).json({ error: "Failed to fetch Whop user profile" });
    }
  });

  // Comprehensive compatibility analysis with AI insights
  app.post("/api/compatibility", async (req, res) => {
    try {
      const { person1, person2 } = req.body;
      
      if (!person1 || !person2 || !person1.name || !person2.name || !person1.birthDate || !person2.birthDate) {
        return res.status(400).json({ error: "Missing required profile data for both persons" });
      }

      // Build CompatibilityProfile objects for AI
      const profile1: CompatibilityProfile = {
        name: person1.name,
        lifePathNumber: person1.lifePathNumber,
        expressionNumber: person1.expressionNumber,
        soulUrgeNumber: person1.soulUrgeNumber,
        personalityNumber: person1.personalityNumber,
        attitudeNumber: person1.attitudeNumber,
        dayOfBirthNumber: person1.dayOfBirthNumber,
        westernZodiac: person1.westernZodiac,
        westernElement: person1.westernElement,
        chineseZodiac: person1.chineseZodiac,
        chineseElement: person1.chineseElement,
        energySignature: person1.energySignature,
      };

      const profile2: CompatibilityProfile = {
        name: person2.name,
        lifePathNumber: person2.lifePathNumber,
        expressionNumber: person2.expressionNumber,
        soulUrgeNumber: person2.soulUrgeNumber,
        personalityNumber: person2.personalityNumber,
        attitudeNumber: person2.attitudeNumber,
        dayOfBirthNumber: person2.dayOfBirthNumber,
        westernZodiac: person2.westernZodiac,
        westernElement: person2.westernElement,
        chineseZodiac: person2.chineseZodiac,
        chineseElement: person2.chineseElement,
        energySignature: person2.energySignature,
      };

      const overallScore = req.body.overallScore || 50;
      const level = req.body.level || 'Neutral';

      const aiInsights = await generateCompatibilityInsights(profile1, profile2, overallScore, level);
      
      res.json({ 
        success: true,
        insights: aiInsights 
      });
    } catch (error) {
      console.error("Error generating compatibility insights:", error);
      res.status(500).json({ error: "Failed to generate compatibility insights" });
    }
  });

  // Legacy AI endpoints (kept for any direct usage)
  app.post("/api/ai/personality", async (req, res) => {
    try {
      const profile: UserNumerologyProfile = req.body;
      
      if (!profile.name || !profile.lifePathNumber) {
        return res.status(400).json({ error: "Missing required profile data" });
      }

      const insights = await generatePersonalityInsights(profile);
      res.json(insights);
    } catch (error) {
      console.error("Error generating personality insights:", error);
      res.status(500).json({ error: "Failed to generate insights" });
    }
  });

  app.post("/api/ai/daily-energy", async (req, res) => {
    try {
      const { profile, personalDayNumber, universalDayNumber, todayDate } = req.body;
      
      if (!profile || !personalDayNumber || !universalDayNumber) {
        return res.status(400).json({ error: "Missing required data" });
      }

      const energy = await generateDailyEnergy(profile, personalDayNumber, universalDayNumber, todayDate);
      res.json(energy);
    } catch (error) {
      console.error("Error generating daily energy:", error);
      res.status(500).json({ error: "Failed to generate daily energy" });
    }
  });

  // CueChats - Initialize chat session (builds user context once)
  app.post("/api/chat/init", async (req, res) => {
    const { odisId } = req.body;
    
    if (!odisId) {
      return res.status(400).json({ error: "Missing odisId" });
    }

    try {
      const user = await storage.getUserByOdisId(odisId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Build the user context once - this does all the expensive calculations
      const { systemContext, firstName } = buildUserContext({
        fullName: user.fullName,
        birthDate: user.birthDate,
        birthTime: user.birthTime || undefined,
        birthLocation: user.birthLocation || undefined,
      });

      res.json({ 
        success: true, 
        systemContext, 
        firstName,
        message: `Chat initialized for ${firstName}. Your profile context is now loaded.`
      });
    } catch (error) {
      console.error("Error initializing chat:", error);
      res.status(500).json({ error: "Failed to initialize chat" });
    }
  });

  // CueChats - Session-based chat (uses pre-computed context - more efficient)
  app.post("/api/chat/session", async (req, res) => {
    const { message, systemContext, firstName, conversationHistory } = req.body;
    
    if (!message || !systemContext || !firstName) {
      return res.status(400).json({ error: "Missing required data. Please start a new chat." });
    }

    try {
      // Validate and normalize conversation history
      const normalizedHistory: ChatMessage[] = [];
      if (Array.isArray(conversationHistory)) {
        for (const msg of conversationHistory) {
          if (msg && typeof msg.content === 'string' && (msg.role === 'user' || msg.role === 'assistant')) {
            normalizedHistory.push({
              role: msg.role,
              content: msg.content,
            });
          }
        }
      }

      const response = await generateChatResponseWithContext(
        message,
        systemContext,
        firstName,
        normalizedHistory
      );

      res.json({ response: response.message });
    } catch (error) {
      console.error("Error generating chat response:", error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  // CueChats - Legacy AI Chat endpoint (kept for backward compatibility)
  app.post("/api/chat", async (req, res) => {
    const { odisId, message, conversationHistory } = req.body;
    
    if (!odisId || !message) {
      return res.status(400).json({ error: "Missing required data" });
    }

    try {
      const user = await storage.getUserByOdisId(odisId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Validate and normalize conversation history
      const normalizedHistory: ChatMessage[] = [];
      if (Array.isArray(conversationHistory)) {
        for (const msg of conversationHistory) {
          if (msg && typeof msg.content === 'string' && (msg.role === 'user' || msg.role === 'assistant')) {
            normalizedHistory.push({
              role: msg.role,
              content: msg.content,
            });
          }
        }
      }

      const response = await generateChatResponse(
        message,
        {
          fullName: user.fullName,
          birthDate: user.birthDate,
          birthTime: user.birthTime || undefined,
          birthLocation: user.birthLocation || undefined,
        },
        normalizedHistory
      );

      res.json({ response: response.message });
    } catch (error) {
      console.error("Error generating chat response:", error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  // CueChats - Streaming AI Chat endpoint for faster responses
  app.post("/api/chat/stream", async (req, res) => {
    const { odisId, message, conversationHistory } = req.body;
    
    if (!odisId || !message) {
      return res.status(400).json({ error: "Missing required data" });
    }

    try {
      const user = await storage.getUserByOdisId(odisId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Validate and normalize conversation history
      const normalizedHistory: ChatMessage[] = [];
      if (Array.isArray(conversationHistory)) {
        for (const msg of conversationHistory) {
          if (msg && typeof msg.content === 'string' && (msg.role === 'user' || msg.role === 'assistant')) {
            normalizedHistory.push({
              role: msg.role,
              content: msg.content,
            });
          }
        }
      }

      // Set up SSE headers
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const stream = generateChatResponseStream(
        message,
        {
          fullName: user.fullName,
          birthDate: user.birthDate,
          birthTime: user.birthTime || undefined,
          birthLocation: user.birthLocation || undefined,
        },
        normalizedHistory
      );

      for await (const chunk of stream) {
        res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
      }
      
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (error) {
      console.error("Error generating chat stream:", error);
      res.write(`data: ${JSON.stringify({ error: "Failed to generate response" })}\n\n`);
      res.end();
    }
  });

  // Course Progress API (in-memory)
  app.get("/api/progress/:courseId", async (req, res) => {
    try {
      const { courseId } = req.params;
      const progress = await storage.getCourseProgress(courseId);
      res.json(progress);
    } catch (error) {
      console.error("Error getting course progress:", error);
      res.status(500).json({ error: "Failed to get progress" });
    }
  });

  app.post("/api/progress/complete", async (req, res) => {
    try {
      const { courseId, lessonId } = req.body;
      if (!courseId || !lessonId) {
        return res.status(400).json({ error: "Missing courseId or lessonId" });
      }
      await storage.markLessonComplete(courseId, lessonId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking lesson complete:", error);
      res.status(500).json({ error: "Failed to mark lesson complete" });
    }
  });

  // Cues Database API with search, filtering, and pagination
  app.get("/api/cues", (req, res) => {
    try {
      const {
        q = '',
        type = '',
        lifePath = '',
        energy = '',
        category = '',
        country = '',
        page = '1',
        pageSize = '30',
      } = req.query as Record<string, string>;

      const pageNum = Math.max(1, parseInt(page) || 1);
      const size = Math.min(100, Math.max(1, parseInt(pageSize) || 30));

      // Filter cues
      let filtered = parsedCues;

      // Text search (name, description, category)
      if (q) {
        const searchTerm = q.toLowerCase();
        filtered = filtered.filter(cue => 
          cue.name.toLowerCase().includes(searchTerm) ||
          (cue.description && cue.description.toLowerCase().includes(searchTerm)) ||
          (cue.category && cue.category.toLowerCase().includes(searchTerm))
        );
      }

      // Filter by type
      if (type) {
        const types = type.split(',').map(t => t.trim());
        filtered = filtered.filter(cue => types.includes(cue.type));
      }

      // Filter by life path number
      if (lifePath) {
        const numbers = lifePath.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
        if (numbers.length > 0) {
          filtered = filtered.filter(cue => numbers.includes(cue.lifePathNumber));
        }
      }

      // Filter by energy signature
      if (energy) {
        const energyTerm = energy.toLowerCase();
        filtered = filtered.filter(cue => 
          cue.energySignature.toLowerCase().includes(energyTerm)
        );
      }

      // Filter by category
      if (category) {
        const categories = category.split(',').map(c => c.trim().toLowerCase());
        filtered = filtered.filter(cue => 
          cue.category && categories.some(c => cue.category!.toLowerCase().includes(c))
        );
      }

      // Filter by country
      if (country) {
        const countries = country.split(',').map(c => c.trim().toLowerCase());
        filtered = filtered.filter(cue => 
          cue.country && countries.some(c => cue.country!.toLowerCase().includes(c))
        );
      }

      // Calculate pagination
      const total = filtered.length;
      const totalPages = Math.ceil(total / size);
      const startIndex = (pageNum - 1) * size;
      const endIndex = startIndex + size;
      const items = filtered.slice(startIndex, endIndex);

      res.json({
        items,
        total,
        page: pageNum,
        pageSize: size,
        totalPages,
        hasMore: pageNum < totalPages,
      });
    } catch (error) {
      console.error("Error fetching cues:", error);
      res.status(500).json({ error: "Failed to fetch cues" });
    }
  });

  // Get single cue by ID with enhanced data
  app.get("/api/cues/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const cue = parsedCues.find(c => c.id === id);
    
    if (!cue) {
      return res.status(404).json({ error: "Cue not found" });
    }
    
    // Parse date for zodiac calculations
    const date = new Date(cue.foundedOrBirth);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // Chinese Zodiac calculation (matches client/src/lib/numerology.ts)
    const chineseAnimals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    const chineseElements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
    // Proper modulo that handles all years correctly
    const animalIndex = ((year - 4) % 12 + 12) % 12;
    const elementIndex = Math.floor((((year - 4) % 10 + 10) % 10) / 2);
    const chineseZodiac = {
      animal: chineseAnimals[animalIndex],
      element: chineseElements[elementIndex],
      yinYang: year % 2 === 0 ? 'Yang' : 'Yin'
    };
    
    // Western Zodiac calculation (matches client/src/lib/numerology.ts)
    const zodiacSigns = [
      { sign: 'Capricorn', element: 'Earth', modality: 'Cardinal', rulingPlanet: 'Saturn', traits: ['Ambitious', 'Disciplined', 'Patient'] },
      { sign: 'Aquarius', element: 'Air', modality: 'Fixed', rulingPlanet: 'Uranus', traits: ['Innovative', 'Independent', 'Humanitarian'] },
      { sign: 'Pisces', element: 'Water', modality: 'Mutable', rulingPlanet: 'Neptune', traits: ['Intuitive', 'Compassionate', 'Artistic'] },
      { sign: 'Aries', element: 'Fire', modality: 'Cardinal', rulingPlanet: 'Mars', traits: ['Bold', 'Ambitious', 'Energetic'] },
      { sign: 'Taurus', element: 'Earth', modality: 'Fixed', rulingPlanet: 'Venus', traits: ['Reliable', 'Patient', 'Devoted'] },
      { sign: 'Gemini', element: 'Air', modality: 'Mutable', rulingPlanet: 'Mercury', traits: ['Adaptable', 'Curious', 'Communicative'] },
      { sign: 'Cancer', element: 'Water', modality: 'Cardinal', rulingPlanet: 'Moon', traits: ['Nurturing', 'Protective', 'Intuitive'] },
      { sign: 'Leo', element: 'Fire', modality: 'Fixed', rulingPlanet: 'Sun', traits: ['Confident', 'Creative', 'Generous'] },
      { sign: 'Virgo', element: 'Earth', modality: 'Mutable', rulingPlanet: 'Mercury', traits: ['Analytical', 'Practical', 'Diligent'] },
      { sign: 'Libra', element: 'Air', modality: 'Cardinal', rulingPlanet: 'Venus', traits: ['Diplomatic', 'Fair', 'Social'] },
      { sign: 'Scorpio', element: 'Water', modality: 'Fixed', rulingPlanet: 'Pluto', traits: ['Passionate', 'Resourceful', 'Determined'] },
      { sign: 'Sagittarius', element: 'Fire', modality: 'Mutable', rulingPlanet: 'Jupiter', traits: ['Adventurous', 'Optimistic', 'Philosophical'] },
    ];
    const zodiacDateRanges: [number, number, number, number][] = [
      [12, 22, 1, 19], [1, 20, 2, 18], [2, 19, 3, 20], [3, 21, 4, 19],
      [4, 20, 5, 20], [5, 21, 6, 20], [6, 21, 7, 22], [7, 23, 8, 22],
      [8, 23, 9, 22], [9, 23, 10, 22], [10, 23, 11, 21], [11, 22, 12, 21],
    ];
    
    let westernZodiac = zodiacSigns[0];
    for (let i = 0; i < zodiacDateRanges.length; i++) {
      const [startMonth, startDay, endMonth, endDay] = zodiacDateRanges[i];
      if (startMonth > endMonth) {
        if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
          westernZodiac = zodiacSigns[i];
          break;
        }
      } else {
        if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay) ||
            (month > startMonth && month < endMonth)) {
          westernZodiac = zodiacSigns[i];
          break;
        }
      }
    }
    
    // Life Path number meanings (matches client numerology)
    const lifePathMeanings: Record<number, { title: string; description: string }> = {
      1: { title: 'The Pioneer', description: 'leadership, innovation, and independence' },
      2: { title: 'The Diplomat', description: 'cooperation, balance, and intuition' },
      3: { title: 'The Communicator', description: 'creativity, self-expression, and optimism' },
      4: { title: 'The Builder', description: 'stability, dedication, and practicality' },
      5: { title: 'The Freedom Seeker', description: 'change, adventure, and versatility' },
      6: { title: 'The Nurturer', description: 'responsibility, care, and harmony' },
      7: { title: 'The Seeker', description: 'wisdom, analysis, and spiritual depth' },
      8: { title: 'The Achiever', description: 'abundance, power, and material mastery' },
      9: { title: 'The Humanitarian', description: 'compassion, wisdom, and universal love' },
      11: { title: 'The Illuminator', description: 'intuition, inspiration, and spiritual insight' },
      22: { title: 'The Master Builder', description: 'visionary manifestation and global impact' },
      33: { title: 'The Master Teacher', description: 'compassionate guidance and healing love' },
    };
    
    // Chinese animal traits
    const animalTraits: Record<string, string[]> = {
      'Rat': ['clever', 'quick-witted', 'resourceful'],
      'Ox': ['diligent', 'dependable', 'strong'],
      'Tiger': ['brave', 'confident', 'competitive'],
      'Rabbit': ['gentle', 'quiet', 'elegant'],
      'Dragon': ['confident', 'intelligent', 'ambitious'],
      'Snake': ['enigmatic', 'wise', 'intuitive'],
      'Horse': ['animated', 'active', 'energetic'],
      'Goat': ['calm', 'gentle', 'creative'],
      'Monkey': ['sharp', 'smart', 'curious'],
      'Rooster': ['observant', 'hardworking', 'courageous'],
      'Dog': ['loyal', 'honest', 'faithful'],
      'Pig': ['compassionate', 'generous', 'diligent'],
    };
    
    const lifePathInfo = lifePathMeanings[cue.lifePathNumber] || { title: 'Unique Path', description: 'distinctive energy patterns' };
    const traits = animalTraits[chineseZodiac.animal] || ['unique', 'special'];
    
    // Generate contextual description based on cue type
    let aboutDescription = '';
    if (cue.type === 'Location') {
      aboutDescription = `${cue.name} thrives on ${chineseZodiac.animal} & ${westernZodiac.sign} energy, aligning with ${chineseZodiac.element}'s ${chineseZodiac.animal} influence. Founded in the Year of the ${chineseZodiac.animal}, the ${westernZodiac.element.toLowerCase()}'s friendly energies have fueled its growth into a ${cue.category ? cue.category.toLowerCase() : 'significant'} powerhouse. ${chineseZodiac.animal}, ${westernZodiac.sign}, & ${lifePathInfo.title} energies flourish here, while those with opposing energies may feel constrained, often finding greater success elsewhere. Fun fact: ${cue.name}'s ${chineseZodiac.element} influence embodies its ${traits.join(', ')} energy literally!`;
    } else if (cue.type === 'Person') {
      aboutDescription = `Born under ${westernZodiac.sign} in the Year of the ${chineseZodiac.yinYang} ${chineseZodiac.element} ${chineseZodiac.animal}, this individual carries ${lifePathInfo.title} energy (Life Path ${cue.lifePathNumber}). Their ${westernZodiac.sign} nature, ruled by ${westernZodiac.rulingPlanet}, blends with the ${traits.join(' and ')} qualities of the ${chineseZodiac.animal}. This unique combination creates their ${cue.energySignature} signature, emphasizing ${lifePathInfo.description}. The ${westernZodiac.element} element enhances their ${westernZodiac.traits.join(', ').toLowerCase()} tendencies.`;
    } else {
      aboutDescription = `${cue.name} was founded under ${westernZodiac.sign} energy in the Year of the ${chineseZodiac.yinYang} ${chineseZodiac.element} ${chineseZodiac.animal}. As ${lifePathInfo.title} (Life Path ${cue.lifePathNumber}), this ${cue.category || 'brand'} embodies ${lifePathInfo.description}. The ${chineseZodiac.animal}'s ${traits.join(', ')} nature combined with ${westernZodiac.sign}'s ${westernZodiac.traits.join(', ').toLowerCase()} influence shapes its ${cue.energySignature} signature. ${westernZodiac.rulingPlanet}'s guidance supports its mission of ${cue.description || 'excellence'}.`;
    }
    
    res.json({ 
      cue: {
        ...cue,
        chineseZodiac,
        westernZodiac,
        aboutDescription,
      }
    });
  });

  // Get cues statistics
  app.get("/api/cues-stats", (_req, res) => {
    const stats = {
      total: totalCuesCount,
      byType: {
        Brand: parsedCues.filter(c => c.type === 'Brand').length,
        Location: parsedCues.filter(c => c.type === 'Location').length,
        Person: parsedCues.filter(c => c.type === 'Person').length,
      },
      byLifePath: {} as Record<number, number>,
    };

    // Count by life path
    parsedCues.forEach(cue => {
      stats.byLifePath[cue.lifePathNumber] = (stats.byLifePath[cue.lifePathNumber] || 0) + 1;
    });

    res.json(stats);
  });

  // ============================================
  // EXPLORE FEATURE ENDPOINTS
  // ============================================

  // Trending Energies - Show what energy patterns are most active today
  app.get("/api/explore/trending-energies", (_req, res) => {
    try {
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const year = today.getFullYear();
      
      // Calculate universal day number
      const monthReduced = reduceNumber(month);
      const dayReduced = reduceNumber(day);
      const yearReduced = reduceNumber(year.toString().split('').reduce((s, d) => s + parseInt(d), 0));
      const universalDay = reduceNumber(monthReduced + dayReduced + yearReduced);
      
      // Count life paths in cues
      const lifePathCounts: Record<number, number> = {};
      parsedCues.forEach(cue => {
        lifePathCounts[cue.lifePathNumber] = (lifePathCounts[cue.lifePathNumber] || 0) + 1;
      });
      
      // Get top 3 life paths
      const sortedLifePaths = Object.entries(lifePathCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([num, count]) => ({ number: parseInt(num), count }));
      
      // Count elements (from energy signatures)
      const elementCounts: Record<string, number> = {};
      parsedCues.forEach(cue => {
        const element = cue.energySignature.split(' ')[0];
        elementCounts[element] = (elementCounts[element] || 0) + 1;
      });
      
      const sortedElements = Object.entries(elementCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([element, count]) => ({ element, count }));
      
      // Get representative cues for today's universal day
      const todaysCues = parsedCues
        .filter(c => c.lifePathNumber === universalDay)
        .slice(0, 6)
        .map(c => ({ id: c.id, name: c.name, type: c.type, energySignature: c.energySignature }));
      
      const lifePathMeanings: Record<number, { title: string; theme: string }> = {
        1: { title: 'The Pioneer', theme: 'Leadership and new beginnings' },
        2: { title: 'The Diplomat', theme: 'Partnership and cooperation' },
        3: { title: 'The Communicator', theme: 'Creativity and self-expression' },
        4: { title: 'The Builder', theme: 'Structure and foundation' },
        5: { title: 'The Freedom Seeker', theme: 'Change and adventure' },
        6: { title: 'The Nurturer', theme: 'Love and responsibility' },
        7: { title: 'The Seeker', theme: 'Wisdom and introspection' },
        8: { title: 'The Powerhouse', theme: 'Success and abundance' },
        9: { title: 'The Humanitarian', theme: 'Compassion and completion' },
        11: { title: 'The Illuminator', theme: 'Spiritual insight and inspiration' },
        22: { title: 'The Master Builder', theme: 'Vision manifested into reality' },
        33: { title: 'The Master Teacher', theme: 'Healing and unconditional love' },
      };
      
      const todayMeaning = lifePathMeanings[universalDay] || { title: 'Universal Energy', theme: 'Balanced vibrations' };
      
      res.json({
        universalDay,
        todayTheme: todayMeaning.theme,
        todayTitle: todayMeaning.title,
        date: today.toISOString().split('T')[0],
        topLifePaths: sortedLifePaths.map(lp => ({
          ...lp,
          ...lifePathMeanings[lp.number]
        })),
        topElements: sortedElements,
        representativeCues: todaysCues,
      });
    } catch (error) {
      console.error("Error getting trending energies:", error);
      res.status(500).json({ error: "Failed to get trending energies" });
    }
  });

  // Helper function for number reduction
  function reduceNumber(num: number): number {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num.toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
    }
    return num;
  }

  // Best Days This Month - Calendar with optimal days based on user's numerology
  app.get("/api/explore/best-days/:birthDate", (req, res) => {
    try {
      const birthDate = new Date(req.params.birthDate);
      if (isNaN(birthDate.getTime())) {
        return res.status(400).json({ error: "Invalid birth date" });
      }
      
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      
      // Calculate user's life path number
      const birthMonth = birthDate.getMonth() + 1;
      const birthDay = birthDate.getDate();
      const birthYear = birthDate.getFullYear();
      const lifePathNumber = reduceNumber(
        reduceNumber(birthMonth) + 
        reduceNumber(birthDay) + 
        reduceNumber(birthYear.toString().split('').reduce((s, d) => s + parseInt(d), 0))
      );
      
      // Calculate personal year
      const personalYear = reduceNumber(birthMonth + birthDay + currentYear);
      
      // Get days in current month
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      
      const dayRatings: Array<{
        date: string;
        day: number;
        personalDay: number;
        rating: 'excellent' | 'good' | 'neutral' | 'challenging';
        theme: string;
        activities: string[];
      }> = [];
      
      const personalDayThemes: Record<number, { theme: string; activities: string[] }> = {
        1: { theme: 'New Beginnings', activities: ['Start projects', 'Take initiative', 'Lead meetings'] },
        2: { theme: 'Cooperation', activities: ['Partnerships', 'Negotiations', 'Relationship talks'] },
        3: { theme: 'Creativity', activities: ['Brainstorming', 'Social events', 'Creative work'] },
        4: { theme: 'Building', activities: ['Planning', 'Organization', 'Detail work'] },
        5: { theme: 'Change', activities: ['Travel', 'New experiences', 'Networking'] },
        6: { theme: 'Nurturing', activities: ['Family time', 'Home projects', 'Self-care'] },
        7: { theme: 'Reflection', activities: ['Research', 'Study', 'Meditation'] },
        8: { theme: 'Achievement', activities: ['Business deals', 'Financial decisions', 'Career moves'] },
        9: { theme: 'Completion', activities: ['Finishing projects', 'Giving back', 'Letting go'] },
        11: { theme: 'Inspiration', activities: ['Spiritual practice', 'Teaching', 'Visionary work'] },
        22: { theme: 'Manifestation', activities: ['Big projects', 'Long-term planning', 'Building legacy'] },
        33: { theme: 'Healing', activities: ['Helping others', 'Counseling', 'Community service'] },
      };
      
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // Calculate personal month and personal day
        const personalMonth = reduceNumber(personalYear + (currentMonth + 1));
        const personalDay = reduceNumber(personalMonth + day);
        
        // Determine rating based on alignment
        let rating: 'excellent' | 'good' | 'neutral' | 'challenging';
        if (personalDay === lifePathNumber) {
          rating = 'excellent';
        } else if ([1, 3, 5, 9].includes(personalDay)) {
          rating = 'good';
        } else if ([4, 7, 8].includes(personalDay)) {
          rating = 'neutral';
        } else {
          rating = 'neutral';
        }
        
        // Master number days are always powerful
        if ([11, 22, 33].includes(personalDay)) {
          rating = 'excellent';
        }
        
        const dayInfo = personalDayThemes[personalDay] || { theme: 'Balance', activities: ['Routine tasks', 'Rest'] };
        
        dayRatings.push({
          date: dateStr,
          day,
          personalDay,
          rating,
          theme: dayInfo.theme,
          activities: dayInfo.activities,
        });
      }
      
      // Find best days (excellent and good)
      const bestDays = dayRatings.filter(d => d.rating === 'excellent' || d.rating === 'good');
      
      res.json({
        lifePathNumber,
        personalYear,
        month: currentMonth + 1,
        year: currentYear,
        monthName: new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long' }),
        days: dayRatings,
        bestDays: bestDays.slice(0, 10),
      });
    } catch (error) {
      console.error("Error getting best days:", error);
      res.status(500).json({ error: "Failed to get best days" });
    }
  });

  // Celebrity Matches - Find celebrities sharing user's energy
  app.get("/api/explore/celebrity-matches", (req, res) => {
    try {
      const { lifePathNumber, energySignature, limit = '12' } = req.query as Record<string, string>;
      
      const limitNum = Math.min(50, parseInt(limit) || 12);
      
      // Filter to persons only
      let celebrities = parsedCues.filter(c => c.type === 'Person');
      
      // Score and sort by match quality
      const scored = celebrities.map(celeb => {
        let score = 0;
        const matches: string[] = [];
        
        if (lifePathNumber && celeb.lifePathNumber === parseInt(lifePathNumber)) {
          score += 50;
          matches.push('Life Path');
        }
        
        if (energySignature) {
          const userElement = energySignature.split(' ')[0];
          const celebElement = celeb.energySignature.split(' ')[0];
          if (userElement === celebElement) {
            score += 30;
            matches.push('Element');
          }
          
          const userEnergy = energySignature.split(' ').slice(1).join(' ');
          const celebEnergy = celeb.energySignature.split(' ').slice(1).join(' ');
          if (userEnergy === celebEnergy) {
            score += 20;
            matches.push('Energy Type');
          }
        }
        
        return { ...celeb, score, matches };
      });
      
      const matches = scored
        .filter(c => c.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limitNum);
      
      res.json({
        matches: matches.map(m => ({
          id: m.id,
          name: m.name,
          type: m.type,
          category: m.category,
          country: m.country,
          lifePathNumber: m.lifePathNumber,
          energySignature: m.energySignature,
          foundedOrBirth: m.foundedOrBirth,
          score: m.score,
          matchReasons: m.matches,
        })),
        totalCelebrities: parsedCues.filter(c => c.type === 'Person').length,
      });
    } catch (error) {
      console.error("Error getting celebrity matches:", error);
      res.status(500).json({ error: "Failed to get celebrity matches" });
    }
  });

  // Travel Destinations - Curated countries with zodiac compatibility
  app.get("/api/explore/travel-destinations", (req, res) => {
    try {
      const { lifePathNumber, element, birthYear } = req.query as Record<string, string>;
      
      const userLifePath = lifePathNumber ? parseInt(lifePathNumber) : null;
      const userBirthYear = birthYear ? parseInt(birthYear) : null;
      
      // Chinese zodiac calculation
      const getChineseZodiac = (year: number): string => {
        const animals = ['Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'];
        return animals[year % 12];
      };
      
      const userZodiac = userBirthYear ? getChineseZodiac(userBirthYear) : null;
      
      // Zodiac compatibility - which signs thrive together
      const zodiacCompatibility: Record<string, string[]> = {
        'Rat': ['Rat', 'Ox', 'Dragon', 'Monkey'],
        'Ox': ['Rat', 'Ox', 'Snake', 'Rooster'],
        'Tiger': ['Tiger', 'Horse', 'Dog', 'Pig'],
        'Rabbit': ['Rabbit', 'Goat', 'Dog', 'Pig'],
        'Dragon': ['Rat', 'Dragon', 'Monkey', 'Rooster'],
        'Snake': ['Ox', 'Snake', 'Rooster', 'Monkey'],
        'Horse': ['Tiger', 'Horse', 'Goat', 'Dog'],
        'Goat': ['Rabbit', 'Horse', 'Goat', 'Pig'],
        'Monkey': ['Rat', 'Dragon', 'Snake', 'Monkey'],
        'Rooster': ['Ox', 'Dragon', 'Snake', 'Rooster'],
        'Dog': ['Tiger', 'Rabbit', 'Horse', 'Dog'],
        'Pig': ['Tiger', 'Rabbit', 'Goat', 'Pig'],
      };
      
      // Curated list of countries with significant founding/independence years
      const countries: Array<{
        name: string;
        year: number;
        description: string;
        vibe: string;
        bestFor: string;
      }> = [
        { name: 'United States', year: 1776, description: 'Born in the Year of the Monkey, the USA channels innovation, ambition, and reinvention. From Silicon Valley to Hollywood, this nation rewards clever problem-solvers and dreamers.', vibe: 'Innovation & Ambition', bestFor: 'Entrepreneurs and dreamers' },
        { name: 'France', year: 1789, description: 'The French Revolution birthed a Rooster-year nation - proud, artistic, and fiercely devoted to beauty and excellence. Paris alone defines romance and sophistication.', vibe: 'Art & Romance', bestFor: 'Artists and romantics' },
        { name: 'Japan', year: 1868, description: 'The Meiji Restoration in the Year of the Dragon launched Japan into modernity. This Dragon energy fuels its technological innovation and cultural influence.', vibe: 'Innovation & Tradition', bestFor: 'Tech lovers and culture seekers' },
        { name: 'India', year: 1947, description: 'Independence in the Year of the Pig brought abundance and spiritual depth. From yoga to Bollywood, India offers comfort, wisdom, and vibrant celebration.', vibe: 'Spirituality & Color', bestFor: 'Soul seekers and adventurers' },
        { name: 'Brazil', year: 1822, description: 'Born in the Year of the Horse, Brazil gallops with freedom, joy, and celebration. Carnival, beaches, and samba embody its passionate spirit.', vibe: 'Joy & Celebration', bestFor: 'Free spirits and dancers' },
        { name: 'Australia', year: 1901, description: 'Federation in the Year of the Ox built a nation of steady determination and laid-back ambition. From Sydney to the Outback, resilience meets adventure.', vibe: 'Adventure & Balance', bestFor: 'Nature lovers and achievers' },
        { name: 'Italy', year: 1861, description: 'Unified in the Year of the Rooster, Italy struts with pride in its art, food, and history. Every region celebrates la dolce vita with authentic flair.', vibe: 'Culture & Pleasure', bestFor: 'Foodies and history lovers' },
        { name: 'Germany', year: 1871, description: 'Born in the Year of the Goat, Germany balances creative artistry with engineering precision. From Beethoven to BMW, innovation meets craftsmanship.', vibe: 'Precision & Creativity', bestFor: 'Engineers and artists' },
        { name: 'Canada', year: 1867, description: 'Confederation in the Year of the Rabbit brought a nation of diplomatic harmony and natural beauty. Politeness and wilderness coexist perfectly.', vibe: 'Nature & Harmony', bestFor: 'Peace seekers and adventurers' },
        { name: 'Mexico', year: 1821, description: 'Independence in the Year of the Snake gave Mexico its mysterious allure and ancient wisdom. Mayan pyramids to mariachi - transformation runs deep.', vibe: 'Mystery & Tradition', bestFor: 'Culture lovers and mystics' },
        { name: 'South Korea', year: 1948, description: 'Founded in the Year of the Rat, South Korea embodies clever innovation and resourcefulness. K-pop, tech, and cuisine - always ahead of trends.', vibe: 'Trendsetting & Innovation', bestFor: 'Trendsetters and tech lovers' },
        { name: 'Spain', year: 1479, description: 'United in the Year of the Pig, Spain celebrates life with generous warmth. Flamenco, siestas, and fiestas honor pleasure without apology.', vibe: 'Passion & Celebration', bestFor: 'Party lovers and artists' },
        { name: 'Thailand', year: 1238, description: 'Ancient Sukhothai Kingdom in the Year of the Dog established loyalty, spirituality, and honest hospitality that define Thai culture today.', vibe: 'Spirituality & Warmth', bestFor: 'Spiritual seekers and foodies' },
        { name: 'United Kingdom', year: 1707, description: 'The Act of Union in the Year of the Pig united kingdoms into an empire of comfort, tradition, and global influence. Tea, royalty, and resilience.', vibe: 'Tradition & Influence', bestFor: 'History buffs and culture lovers' },
        { name: 'Greece', year: 1821, description: 'Independence in the Year of the Snake revived ancient Dragon wisdom. Birthplace of democracy, philosophy, and the Olympic spirit.', vibe: 'Wisdom & History', bestFor: 'Philosophers and beach lovers' },
        { name: 'Singapore', year: 1965, description: 'Independence in the Year of the Snake transformed a port into a financial powerhouse. Order, prosperity, and multicultural harmony thrive.', vibe: 'Prosperity & Order', bestFor: 'Business minds and foodies' },
        { name: 'UAE', year: 1971, description: 'Founded in the Year of the Pig, the UAE turned desert into luxury. Dubai and Abu Dhabi embody ambitious comfort and limitless vision.', vibe: 'Luxury & Ambition', bestFor: 'Luxury seekers and dreamers' },
        { name: 'South Africa', year: 1994, description: 'New democracy in the Year of the Dog brought loyalty to justice and rainbow nation harmony. Safari, wine, and healing converge.', vibe: 'Healing & Adventure', bestFor: 'Justice seekers and nature lovers' },
        { name: 'Egypt', year: 1922, description: 'Independence in the Year of the Dog renewed ancient mysteries. The pyramids, Nile, and pharaonic wisdom call to loyal seekers of truth.', vibe: 'Mystery & Ancient Power', bestFor: 'History lovers and mystics' },
        { name: 'Indonesia', year: 1945, description: 'Independence in the Year of the Rooster gave Indonesia its proud diversity. Bali\'s spirituality to Jakarta\'s hustle - authenticity across 17,000 islands.', vibe: 'Diversity & Spirit', bestFor: 'Island hoppers and soul seekers' },
        { name: 'Portugal', year: 1143, description: 'Europe\'s oldest nation born in the Year of the Pig pioneered global exploration with generous spirit. Fado, wine, and saudade await.', vibe: 'Exploration & Soul', bestFor: 'Romantics and explorers' },
        { name: 'Netherlands', year: 1581, description: 'Independence in the Year of the Snake brought clever trade and progressive values. Canals, art, and freedom define this innovative nation.', vibe: 'Freedom & Innovation', bestFor: 'Free thinkers and art lovers' },
        { name: 'New Zealand', year: 1907, description: 'Dominion in the Year of the Goat blessed this land with creative beauty and peaceful adventure. Middle Earth magic meets Maori wisdom.', vibe: 'Nature & Magic', bestFor: 'Adventurers and dreamers' },
        { name: 'Morocco', year: 1956, description: 'Independence in the Year of the Monkey brought clever craftsmanship and vibrant reinvention. Marrakech\'s medina swirls with ancient-modern fusion.', vibe: 'Mystery & Craftsmanship', bestFor: 'Adventurers and artists' },
      ];
      
      // Process each country with compatibility info
      const destinations = countries.map((country, index) => {
        const zodiacAnimal = getChineseZodiac(country.year);
        
        // Find all signs compatible with this country's zodiac
        const compatibleSigns: string[] = [];
        Object.entries(zodiacCompatibility).forEach(([sign, compatWith]) => {
          if (compatWith.includes(zodiacAnimal)) {
            compatibleSigns.push(sign);
          }
        });
        
        // Calculate score based on user's zodiac match
        let score = 70; // Base score - all destinations are good
        const isUserMatch = userZodiac ? compatibleSigns.includes(userZodiac) : false;
        
        if (isUserMatch) {
          score = 92; // High score for compatible users
        }
        
        // Add life path bonus
        const lifePathFromYear = ((country.year - 1) % 9) + 1;
        if (userLifePath && userLifePath === lifePathFromYear) {
          score = Math.min(98, score + 5);
        }
        
        return {
          id: index + 1,
          name: country.name,
          foundingYear: country.year,
          zodiacAnimal,
          compatibleSigns,
          description: country.description,
          vibe: country.vibe,
          bestFor: country.bestFor,
          score,
          isUserMatch,
        };
      });
      
      // Sort by score (user matches first) then alphabetically
      const sorted = destinations.sort((a, b) => {
        if (a.isUserMatch !== b.isUserMatch) {
          return a.isUserMatch ? -1 : 1;
        }
        return b.score - a.score;
      });
      
      res.json({
        destinations: sorted.map(d => ({
          id: d.id,
          name: d.name,
          foundingYear: d.foundingYear,
          zodiacAnimal: d.zodiacAnimal,
          compatibleSigns: d.compatibleSigns,
          description: d.description,
          vibe: d.vibe,
          bestFor: d.bestFor,
          score: d.score,
          isUserMatch: d.isUserMatch,
        })),
        userZodiac,
      });
    } catch (error) {
      console.error("Error getting travel destinations:", error);
      res.status(500).json({ error: "Failed to get travel destinations" });
    }
  });

  // Relationship Patterns - Compatibility tendencies
  app.get("/api/explore/relationship-patterns/:lifePathNumber", (req, res) => {
    try {
      const lifePathNumber = parseInt(req.params.lifePathNumber);
      
      if (isNaN(lifePathNumber) || lifePathNumber < 1 || (lifePathNumber > 9 && ![11, 22, 33].includes(lifePathNumber))) {
        return res.status(400).json({ error: "Invalid life path number" });
      }
      
      // Compatibility matrix based on numerology
      const compatibilityData: Record<number, { best: number[]; good: number[]; challenging: number[]; description: string }> = {
        1: { best: [3, 5], good: [1, 2, 9], challenging: [4, 8], description: 'As a natural leader, you thrive with creative and adventurous partners who appreciate your independence.' },
        2: { best: [4, 8], good: [1, 2, 6], challenging: [5, 7], description: 'Your diplomatic nature flourishes with stable, ambitious partners who value harmony and commitment.' },
        3: { best: [1, 5, 7], good: [3, 6, 9], challenging: [4, 8], description: 'Your creative spirit connects best with innovative and intellectual partners who appreciate your expressiveness.' },
        4: { best: [2, 8], good: [4, 6, 7], challenging: [1, 3, 5], description: 'Your grounded nature pairs well with practical, ambitious partners who share your commitment to building a secure future.' },
        5: { best: [1, 3, 7], good: [5, 9], challenging: [2, 4, 6], description: 'Your adventurous spirit thrives with partners who embrace change and give you freedom to explore.' },
        6: { best: [2, 9], good: [3, 4, 6], challenging: [1, 5, 7], description: 'Your nurturing heart connects deeply with compassionate partners who value family and responsibility.' },
        7: { best: [3, 5], good: [1, 7, 9], challenging: [2, 6, 8], description: 'Your introspective nature appreciates intellectual and independent partners who respect your need for space.' },
        8: { best: [2, 4], good: [6, 8], challenging: [1, 3, 7], description: 'Your ambitious drive pairs well with practical, supportive partners who share your vision for success.' },
        9: { best: [1, 6], good: [2, 3, 9], challenging: [4, 5, 8], description: 'Your humanitarian heart flourishes with partners who share your idealism and compassion for others.' },
        11: { best: [2, 6], good: [1, 7, 11], challenging: [4, 8], description: 'Your intuitive gifts resonate with sensitive, spiritual partners who understand your heightened awareness.' },
        22: { best: [4, 8], good: [2, 6, 22], challenging: [3, 5], description: 'Your master builder energy pairs with practical visionaries who can help manifest your grand dreams.' },
        33: { best: [6, 9], good: [3, 11, 33], challenging: [1, 8], description: 'Your healing presence attracts compassionate souls who share your dedication to service and unconditional love.' },
      };
      
      const data = compatibilityData[lifePathNumber] || compatibilityData[9];
      
      const lifePathMeanings: Record<number, string> = {
        1: 'The Pioneer', 2: 'The Diplomat', 3: 'The Communicator',
        4: 'The Builder', 5: 'The Freedom Seeker', 6: 'The Nurturer',
        7: 'The Seeker', 8: 'The Powerhouse', 9: 'The Humanitarian',
        11: 'The Illuminator', 22: 'The Master Builder', 33: 'The Master Teacher',
      };
      
      res.json({
        lifePathNumber,
        title: lifePathMeanings[lifePathNumber],
        description: data.description,
        bestMatches: data.best.map(n => ({ number: n, title: lifePathMeanings[n] })),
        goodMatches: data.good.map(n => ({ number: n, title: lifePathMeanings[n] })),
        challengingMatches: data.challenging.map(n => ({ number: n, title: lifePathMeanings[n] })),
        tips: [
          'Remember that any relationship can work with understanding and effort',
          'Focus on complementary strengths rather than differences',
          'Communication is key regardless of numerical compatibility',
          'Use challenges as opportunities for growth together',
        ],
      });
    } catch (error) {
      console.error("Error getting relationship patterns:", error);
      res.status(500).json({ error: "Failed to get relationship patterns" });
    }
  });

  // Career Alignment - Industries and roles matching user's energy
  app.get("/api/explore/career-alignment/:lifePathNumber", (req, res) => {
    try {
      const lifePathNumber = parseInt(req.params.lifePathNumber);
      
      if (isNaN(lifePathNumber) || lifePathNumber < 1 || (lifePathNumber > 9 && ![11, 22, 33].includes(lifePathNumber))) {
        return res.status(400).json({ error: "Invalid life path number" });
      }
      
      // Career recommendations by life path with role explanations
      const careerData: Record<number, { industries: string[]; roles: { name: string; reason: string }[]; strengths: string[]; description: string; whyTheseFit: string }> = {
        1: { 
          industries: ['Technology', 'Entrepreneurship', 'Consulting', 'Sports'],
          roles: [
            { name: 'CEO', reason: 'Your natural leadership and independence make you ideal for top executive positions' },
            { name: 'Founder', reason: 'Pioneers thrive when building something from scratch on their own terms' },
            { name: 'Director', reason: 'Your decisiveness and vision guide teams toward ambitious goals' },
            { name: 'Team Lead', reason: 'Your self-starter energy inspires others to follow your initiative' },
            { name: 'Innovator', reason: 'Your pioneering spirit naturally seeks new solutions and breakthroughs' },
          ],
          strengths: ['Leadership', 'Innovation', 'Decision-making', 'Independence'],
          description: 'Your pioneering spirit makes you a natural entrepreneur and leader in any field.',
          whyTheseFit: 'As a Life Path 1, you thrive when you can chart your own course and lead by example. These roles let you leverage your natural independence and visionary thinking.'
        },
        2: { 
          industries: ['Healthcare', 'Counseling', 'Human Resources', 'Diplomacy'],
          roles: [
            { name: 'Mediator', reason: 'Your innate ability to see both sides makes conflict resolution your strength' },
            { name: 'Counselor', reason: 'Your empathy and patience create safe spaces for others to open up' },
            { name: 'Partner', reason: 'You excel in collaborative roles where teamwork is essential' },
            { name: 'Coordinator', reason: 'Your diplomatic skills bring diverse groups together harmoniously' },
            { name: 'Support Specialist', reason: 'Your nurturing nature shines in helping others succeed' },
          ],
          strengths: ['Cooperation', 'Intuition', 'Diplomacy', 'Patience'],
          description: 'Your diplomatic nature excels in roles requiring partnership and emotional intelligence.',
          whyTheseFit: 'As a Life Path 2, you have a gift for creating harmony and understanding others deeply. These roles utilize your cooperative spirit and emotional sensitivity.'
        },
        3: { 
          industries: ['Entertainment', 'Marketing', 'Arts', 'Media', 'Writing'],
          roles: [
            { name: 'Creative Director', reason: 'Your artistic vision and ability to inspire makes you a natural creative leader' },
            { name: 'Writer', reason: 'Your gift for expression translates beautifully into written words' },
            { name: 'Artist', reason: 'Creative self-expression is your natural way of communicating' },
            { name: 'Speaker', reason: 'Your charisma and communication skills captivate audiences' },
            { name: 'Designer', reason: 'Your eye for beauty and creativity brings ideas to visual life' },
          ],
          strengths: ['Creativity', 'Communication', 'Inspiration', 'Charisma'],
          description: 'Your creative gifts flourish in expressive roles that inspire and entertain others.',
          whyTheseFit: 'As a Life Path 3, you were born to express and create. These roles let you share your unique vision and bring joy to others through your natural talents.'
        },
        4: { 
          industries: ['Engineering', 'Construction', 'Finance', 'Manufacturing'],
          roles: [
            { name: 'Engineer', reason: 'Your methodical approach and precision make technical problem-solving natural' },
            { name: 'Architect', reason: 'You excel at creating solid, lasting structures with practical purpose' },
            { name: 'Accountant', reason: 'Your attention to detail and reliability ensure accuracy in finances' },
            { name: 'Project Manager', reason: 'Your organizational skills keep complex projects on track' },
            { name: 'Analyst', reason: 'Your systematic thinking excels at breaking down complex problems' },
          ],
          strengths: ['Organization', 'Reliability', 'Precision', 'Dedication'],
          description: 'Your methodical approach builds lasting structures in any systematic field.',
          whyTheseFit: 'As a Life Path 4, you are the master builder who creates enduring value. These roles reward your dedication, precision, and ability to see projects through to completion.'
        },
        5: { 
          industries: ['Travel', 'Sales', 'Journalism', 'Entertainment'],
          roles: [
            { name: 'Sales Rep', reason: 'Your adaptability and communication skills close deals naturally' },
            { name: 'Travel Agent', reason: 'Your love of adventure helps others discover new experiences' },
            { name: 'Journalist', reason: 'Your curiosity and versatility uncover compelling stories' },
            { name: 'Promoter', reason: 'Your dynamic energy and networking create buzz and excitement' },
            { name: 'Consultant', reason: 'Your variety-seeking nature thrives with diverse clients and projects' },
          ],
          strengths: ['Adaptability', 'Communication', 'Networking', 'Versatility'],
          description: 'Your adventurous spirit thrives in dynamic roles with variety and change.',
          whyTheseFit: 'As a Life Path 5, you need freedom and variety to feel alive. These roles offer the constant change and new experiences that fuel your adventurous spirit.'
        },
        6: { 
          industries: ['Education', 'Healthcare', 'Hospitality', 'Social Work'],
          roles: [
            { name: 'Teacher', reason: 'Your nurturing nature creates supportive learning environments' },
            { name: 'Nurse', reason: 'Your caring heart provides comfort and healing to those in need' },
            { name: 'Therapist', reason: 'Your ability to create harmony helps others find balance' },
            { name: 'Chef', reason: 'Nurturing others through food satisfies your desire to serve' },
            { name: 'Interior Designer', reason: 'Creating beautiful, harmonious spaces brings you joy' },
          ],
          strengths: ['Nurturing', 'Responsibility', 'Service', 'Harmony'],
          description: 'Your caring nature excels in roles that serve and uplift others.',
          whyTheseFit: 'As a Life Path 6, you find deep fulfillment in caring for others and creating beauty. These roles let you make a tangible difference in people\'s lives.'
        },
        7: { 
          industries: ['Research', 'Technology', 'Science', 'Academia', 'Spirituality'],
          roles: [
            { name: 'Researcher', reason: 'Your love of deep analysis uncovers truths others miss' },
            { name: 'Scientist', reason: 'Your analytical mind and curiosity drive breakthrough discoveries' },
            { name: 'Analyst', reason: 'Your ability to see patterns helps solve complex problems' },
            { name: 'Professor', reason: 'Sharing deep knowledge with seekers feeds your soul' },
            { name: 'Strategist', reason: 'Your wisdom and foresight guide long-term planning' },
          ],
          strengths: ['Analysis', 'Research', 'Intuition', 'Wisdom'],
          description: 'Your analytical mind thrives in roles requiring deep thinking and expertise.',
          whyTheseFit: 'As a Life Path 7, you seek truth and deep understanding. These roles give you the space for contemplation and mastery that your inquisitive nature craves.'
        },
        8: { 
          industries: ['Finance', 'Real Estate', 'Business', 'Law'],
          roles: [
            { name: 'Executive', reason: 'Your natural authority and ambition command respect at the highest levels' },
            { name: 'Investor', reason: 'Your vision for abundance helps you spot profitable opportunities' },
            { name: 'Lawyer', reason: 'Your power and strategic thinking win cases and influence outcomes' },
            { name: 'Manager', reason: 'Your organizational abilities and authority create efficient teams' },
            { name: 'Business Owner', reason: 'Building material success comes naturally to your energy' },
          ],
          strengths: ['Ambition', 'Management', 'Vision', 'Authority'],
          description: 'Your powerhouse energy excels in positions of authority and wealth creation.',
          whyTheseFit: 'As a Life Path 8, you are here to master the material world. These roles let you exercise your natural authority and build the abundance you\'re destined for.'
        },
        9: { 
          industries: ['Non-profit', 'Arts', 'Healing', 'International Relations'],
          roles: [
            { name: 'Humanitarian', reason: 'Your compassion drives you to make the world a better place' },
            { name: 'Artist', reason: 'Your wisdom and vision create work that touches universal themes' },
            { name: 'Healer', reason: 'Your gift for understanding others promotes deep transformation' },
            { name: 'Advisor', reason: 'Your broad perspective offers wisdom that guides others\' paths' },
            { name: 'Philanthropist', reason: 'Your generous heart naturally gives back to those in need' },
          ],
          strengths: ['Compassion', 'Vision', 'Wisdom', 'Generosity'],
          description: 'Your humanitarian heart finds fulfillment in roles that serve the greater good.',
          whyTheseFit: 'As a Life Path 9, you are here to serve humanity and leave a meaningful legacy. These roles channel your wisdom and compassion toward making lasting change.'
        },
        11: { 
          industries: ['Spirituality', 'Arts', 'Psychology', 'Media'],
          roles: [
            { name: 'Spiritual Teacher', reason: 'Your heightened intuition guides others on their spiritual journey' },
            { name: 'Psychic', reason: 'Your sensitivity to energies provides insights beyond the ordinary' },
            { name: 'Counselor', reason: 'Your deep intuition helps others understand themselves' },
            { name: 'Artist', reason: 'Channeling inspiration into creative work comes naturally' },
            { name: 'Innovator', reason: 'Your visionary ideas illuminate new possibilities' },
          ],
          strengths: ['Intuition', 'Inspiration', 'Vision', 'Sensitivity'],
          description: 'Your illuminating presence guides others through spiritual and creative work.',
          whyTheseFit: 'As a Master Number 11, you carry heightened spiritual awareness. These roles let you channel divine inspiration and illuminate the path for others.'
        },
        22: { 
          industries: ['Architecture', 'Politics', 'Large Enterprises', 'Infrastructure'],
          roles: [
            { name: 'Architect', reason: 'Your vision for large-scale creation manifests in lasting structures' },
            { name: 'Leader', reason: 'Your ability to turn vision into reality inspires large groups' },
            { name: 'Visionary', reason: 'You see possibilities that others cannot even imagine' },
            { name: 'Builder', reason: 'Creating systems and structures that endure is your purpose' },
            { name: 'Reformer', reason: 'Your practical idealism transforms institutions for the better' },
          ],
          strengths: ['Vision', 'Manifestation', 'Leadership', 'Practicality'],
          description: 'Your master builder energy creates lasting impact through large-scale projects.',
          whyTheseFit: 'As a Master Number 22, you have the rare ability to manifest grand visions. These roles let you build legacies that transform the world.'
        },
        33: { 
          industries: ['Education', 'Healing', 'Spirituality', 'Community Service'],
          roles: [
            { name: 'Master Teacher', reason: 'Your wisdom and compassion uplift all who learn from you' },
            { name: 'Healer', reason: 'Your unconditional love creates profound transformation in others' },
            { name: 'Counselor', reason: 'Your deep compassion provides safe harbor for troubled souls' },
            { name: 'Spiritual Leader', reason: 'Your selfless service inspires communities toward higher purpose' },
            { name: 'Mentor', reason: 'Guiding others to their highest potential is your sacred gift' },
          ],
          strengths: ['Healing', 'Teaching', 'Compassion', 'Wisdom'],
          description: 'Your master teacher energy uplifts humanity through selfless service and wisdom.',
          whyTheseFit: 'As a Master Number 33, you carry the highest vibration of compassionate service. These roles let you heal and teach at the deepest level.'
        },
      };
      
      const data = careerData[lifePathNumber] || careerData[9];
      
      const lifePathMeanings: Record<number, string> = {
        1: 'The Pioneer', 2: 'The Diplomat', 3: 'The Communicator',
        4: 'The Builder', 5: 'The Freedom Seeker', 6: 'The Nurturer',
        7: 'The Seeker', 8: 'The Powerhouse', 9: 'The Humanitarian',
        11: 'The Illuminator', 22: 'The Master Builder', 33: 'The Master Teacher',
      };
      
      res.json({
        lifePathNumber,
        title: lifePathMeanings[lifePathNumber],
        description: data.description,
        whyTheseFit: data.whyTheseFit,
        industries: data.industries,
        suggestedRoles: data.roles,
        coreStrengths: data.strengths,
      });
    } catch (error) {
      console.error("Error getting career alignment:", error);
      res.status(500).json({ error: "Failed to get career alignment" });
    }
  });

  // Diagnostic endpoint to check Whop API key and company info
  app.get("/api/whop/debug", requireWhopAuth, async (req: WhopRequest, res) => {
    console.log("[Whop Debug] Starting diagnostics...");
    
    try {
      const { whopSdk } = await import("./whop");
      
      const debugInfo: any = {
        apiKeyPresent: !!process.env.WHOP_API_KEY,
        apiKeyLength: process.env.WHOP_API_KEY?.length || 0,
        apiKeyPrefix: process.env.WHOP_API_KEY?.substring(0, 10) + "...",
        appId: process.env.WHOP_APP_ID,
        viteAppId: process.env.VITE_WHOP_APP_ID,
        sdkInitialized: !!whopSdk,
        experienceId: req.experienceId,
        companyId: req.companyId,
        userId: req.whopUser?.userId,
      };

      // Try to get experience info if we have experienceId
      if (whopSdk && req.experienceId) {
        try {
          console.log(`[Whop Debug] Fetching experience: ${req.experienceId}`);
          const experience = await whopSdk.experiences.retrieve(req.experienceId);
          debugInfo.experience = {
            id: experience.id,
            name: experience.name,
            // @ts-ignore
            companyId: (experience as any).company?.id || (experience as any).company_id,
          };
          // @ts-ignore
          console.log(`[Whop Debug] Experience company_id: ${(experience as any).company?.id || (experience as any).company_id}`);
        } catch (e: any) {
          debugInfo.experienceError = e?.message || "Failed to fetch experience";
          console.error("[Whop Debug] Experience fetch error:", e?.message);
        }
      }

      // Try to retrieve app info
      if (whopSdk) {
        try {
          console.log(`[Whop Debug] Fetching app: ${process.env.WHOP_APP_ID}`);
          const app = await whopSdk.apps.retrieve(process.env.WHOP_APP_ID!);
          debugInfo.app = {
            id: app.id,
            name: app.name,
            // @ts-ignore
            companyId: (app as any).company?.id || (app as any).company_id,
          };
          // @ts-ignore
          console.log(`[Whop Debug] App company_id: ${(app as any).company?.id || (app as any).company_id}`);
        } catch (e: any) {
          debugInfo.appError = e?.message || "Failed to fetch app";
          console.error("[Whop Debug] App fetch error:", e?.message);
        }
      }

      console.log("[Whop Debug] Results:", JSON.stringify(debugInfo, null, 2));
      res.json(debugInfo);
    } catch (error: any) {
      console.error("[Whop Debug] Error:", error);
      res.status(500).json({ error: error?.message || "Debug failed" });
    }
  });

  // Whop In-App Purchase - Create checkout configuration
  app.post("/api/checkout/create", requireWhopAuth, async (req: WhopRequest, res) => {
    const whopUserId = req.whopUser?.userId;
    console.log(`[Whop Checkout] Starting checkout creation for user: ${whopUserId}`);
    
    try {
      const { whopSdk } = await import("./whop");
      
      if (!whopSdk) {
        console.error("[Whop Checkout] SDK not initialized - missing WHOP_API_KEY or WHOP_APP_ID");
        return res.status(500).json({ error: "Whop SDK not initialized" });
      }

      const planId = "plan_rp2yShIBnW6LT";
      console.log(`[Whop Checkout] Creating checkout configuration for plan: ${planId}`);
      console.log(`[Whop Checkout] API Key present: ${!!process.env.WHOP_API_KEY}`);
      console.log(`[Whop Checkout] API Key length: ${process.env.WHOP_API_KEY?.length || 0}`);
      console.log(`[Whop Checkout] App ID: ${process.env.WHOP_APP_ID}`);
      
      const checkoutConfiguration = await whopSdk.checkoutConfigurations.create({
        plan_id: planId,
      });

      console.log(`[Whop Checkout] Success! Configuration ID: ${checkoutConfiguration.id}`);
      console.log(`[Whop Checkout] Plan ID from response: ${checkoutConfiguration.plan?.id}`);

      res.json({
        id: checkoutConfiguration.id,
        planId: checkoutConfiguration.plan?.id || planId,
      });
    } catch (error: any) {
      console.error("[Whop Checkout] Error creating checkout configuration:");
      console.error(`[Whop Checkout] Error type: ${error?.constructor?.name}`);
      console.error(`[Whop Checkout] Error status: ${error?.status}`);
      console.error(`[Whop Checkout] Error message: ${error?.message}`);
      if (error?.error) {
        console.error(`[Whop Checkout] Error details:`, JSON.stringify(error.error, null, 2));
      }
      if (error?.status === 401) {
        console.error("[Whop Checkout] 401 Unauthorized - Check that your WHOP_API_KEY:");
        console.error("  1. Is valid and not expired");
        console.error("  2. Has 'checkout_configuration:create' permission");
        console.error("  3. Belongs to the same company that owns the plan");
      }
      if (error?.status === 403) {
        console.error("[Whop Checkout] 403 Forbidden - API key lacks required permissions");
      }
      if (error?.status === 404) {
        console.error("[Whop Checkout] 404 Not Found - Plan ID may not exist or not accessible");
      }
      res.status(error?.status || 500).json({ 
        error: "Failed to create checkout configuration",
        details: error?.error?.message || error?.message
      });
    }
  });

  // Email notification for upgrade button clicks
  app.post("/api/notify-upgrade-click", async (req: WhopRequest, res) => {
    try {
      const { userId, username, profilePictureUrl, odisId, fullName, email } = req.body;
      
      const resendApiKey = process.env.RESEND_API_KEY;
      const notificationEmail = process.env.NOTIFICATION_EMAIL;
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
      
      if (!resendApiKey || !notificationEmail) {
        console.error('[Notify] Missing RESEND_API_KEY or NOTIFICATION_EMAIL');
        return res.status(500).json({ error: 'Email notification not configured' });
      }
      
      const resend = new Resend(resendApiKey);
      
      const timestamp = new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        dateStyle: 'full',
        timeStyle: 'long'
      });
      
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #d4a33e; border-bottom: 2px solid #d4a33e; padding-bottom: 10px;">
            Upgrade Button Clicked
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">User Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 140px;"><strong>Whop User ID:</strong></td>
                <td style="padding: 8px 0; color: #333;">${userId || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Username:</strong></td>
                <td style="padding: 8px 0; color: #333;">${username || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Full Name:</strong></td>
                <td style="padding: 8px 0; color: #333;">${fullName || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>ODIS ID:</strong></td>
                <td style="padding: 8px 0; color: #333;">${odisId || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #333;">${email || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Timestamp:</strong></td>
                <td style="padding: 8px 0; color: #333;">${timestamp}</td>
              </tr>
            </table>
            ${profilePictureUrl ? `
              <div style="margin-top: 15px;">
                <strong style="color: #666;">Profile Picture:</strong><br/>
                <img src="${profilePictureUrl}" alt="Profile" style="width: 80px; height: 80px; border-radius: 50%; margin-top: 8px; border: 2px solid #d4a33e;" />
              </div>
            ` : ''}
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 30px;">
            This notification was sent from GG33 Pro Upgrade System
          </p>
        </div>
      `;
      
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: notificationEmail,
        subject: `GG33 Pro Upgrade Click - ${username || fullName || userId || 'Unknown User'}`,
        html: emailHtml,
      });
      
      if (error) {
        console.error('[Notify] Resend error:', error);
        return res.status(500).json({ error: 'Failed to send notification email' });
      }
      
      console.log('[Notify] Email sent successfully:', data?.id);
      res.json({ success: true, emailId: data?.id });
    } catch (error) {
      console.error('[Notify] Error sending notification:', error);
      res.status(500).json({ error: 'Failed to send notification' });
    }
  });

  // Whop In-App Purchase - Upgrade user to Pro after successful payment
  // This endpoint checks the user's membership status for the Pro plan
  app.post("/api/upgrade-to-pro", requireWhopAuth, async (req: WhopRequest, res) => {
    try {
      const whopUserId = req.whopUser!.userId;
      const { receiptId } = req.body;
      
      const { whopSdk } = await import("./whop");
      
      if (!whopSdk) {
        return res.status(500).json({ error: "Whop SDK not initialized" });
      }

      const EXPECTED_PLAN_ID = "plan_rp2yShIBnW6LT";
      const WHOP_COMPANY_ID = process.env.WHOP_COMPANY_ID;
      
      // Check if user already has an active membership for the Pro plan
      console.log(`[Whop] Checking membership status for user ${whopUserId}...`);
      
      // Get company ID - try from environment variable first, then from app
      let companyId = WHOP_COMPANY_ID;
      if (!companyId) {
        try {
          const app = await whopSdk.apps.retrieve(process.env.WHOP_APP_ID!);
          companyId = (app as any).company?.id;
          console.log(`[Whop] Got company ID from app: ${companyId}`);
        } catch (appError: any) {
          console.error(`[Whop] Could not get company from app:`, appError?.message);
        }
      }
      
      if (!companyId) {
        console.error(`[Whop] No company ID available - set WHOP_COMPANY_ID environment variable`);
        return res.status(500).json({ error: "Whop company ID not configured" });
      }
      
      let membershipId: string | null = null;
      let manageUrl: string | null = null;
      
      try {
        // List all memberships for this user and find one matching our plan
        const memberships = await whopSdk.memberships.list({
          company_id: companyId,
          user_ids: [whopUserId],
          plan_ids: [EXPECTED_PLAN_ID],
        });
        
        console.log(`[Whop] Found ${memberships.data?.length || 0} memberships for user`);
        
        // Find an active membership for our Pro plan
        const proMembership = memberships.data?.find((mem: any) => {
          const isOurPlan = mem.plan?.id === EXPECTED_PLAN_ID;
          const isActive = mem.status === 'active' || mem.status === 'trialing';
          console.log(`[Whop] Membership ${mem.id}: plan=${mem.plan?.id}, status=${mem.status}, isOurPlan=${isOurPlan}, isActive=${isActive}`);
          return isOurPlan && isActive;
        });
        
        if (proMembership) {
          membershipId = proMembership.id;
          manageUrl = proMembership.manage_url || null;
          console.log(`[Whop] Found active Pro membership: ${membershipId}, manage_url: ${manageUrl}`);
        } else {
          console.log(`[Whop] No active membership found for plan ${EXPECTED_PLAN_ID}`);
          
          // If we have a receiptId, try to verify the payment directly as fallback
          if (receiptId) {
            console.log(`[Whop] Attempting to verify payment ${receiptId}...`);
            try {
              const payment = await whopSdk.payments.retrieve(receiptId);
              
              if (payment && (payment as any).user_id === whopUserId && payment.status === 'paid') {
                console.log(`[Whop] Payment verified, checking for membership creation...`);
                // Payment is valid but membership might not be created yet
                // This can happen with slight delays - let the user retry
                return res.status(400).json({ 
                  error: "Payment verified but membership is still being created. Please wait a moment and try again.",
                  retry: true
                });
              }
            } catch (paymentError: any) {
              console.error(`[Whop] Payment verification failed:`, paymentError?.message);
            }
          }
          
          return res.status(400).json({ error: "No active Pro membership found. Please complete the purchase first." });
        }
      } catch (listError: any) {
        console.error("[Whop] Error listing memberships:", listError?.message);
        return res.status(500).json({ error: "Could not verify membership status" });
      }
      
      const user = await storage.getUserByWhopId(whopUserId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.isPro) {
        return res.json({ success: true, message: "User is already Pro", user, membershipId, manageUrl });
      }

      // Upgrade user and store membership ID
      const updatedUser = await storage.upgradeUserToPro(whopUserId, membershipId);
      if (!updatedUser) {
        return res.status(500).json({ error: "Failed to upgrade user" });
      }

      console.log(`[Whop] User ${whopUserId} upgraded to Pro with membership ${membershipId}`);
      res.json({ success: true, user: updatedUser, membershipId, manageUrl });
    } catch (error) {
      console.error("Error upgrading user to Pro:", error);
      res.status(500).json({ error: "Failed to upgrade user" });
    }
  });

  // Get user's Pro membership info including billing portal URL
  app.get("/api/membership", requireWhopAuth, async (req: WhopRequest, res) => {
    try {
      const whopUserId = req.whopUser!.userId;
      
      const { whopSdk } = await import("./whop");
      
      if (!whopSdk) {
        return res.status(500).json({ error: "Whop SDK not initialized" });
      }

      const EXPECTED_PLAN_ID = "plan_rp2yShIBnW6LT";
      const WHOP_COMPANY_ID = process.env.WHOP_COMPANY_ID;
      
      // Get company ID - try from environment variable first, then from app
      let companyId = WHOP_COMPANY_ID;
      if (!companyId) {
        try {
          const app = await whopSdk.apps.retrieve(process.env.WHOP_APP_ID!);
          companyId = (app as any).company?.id;
        } catch (appError: any) {
          console.error(`[Whop] Could not get company from app:`, appError?.message);
        }
      }
      
      if (!companyId) {
        return res.status(500).json({ error: "Whop company ID not configured" });
      }
      
      try {
        console.log(`[Whop Membership] Checking for user ${whopUserId}, company ${companyId}, plan ${EXPECTED_PLAN_ID}`);
        
        const memberships = await whopSdk.memberships.list({
          company_id: companyId,
          user_ids: [whopUserId],
          plan_ids: [EXPECTED_PLAN_ID],
        });
        
        console.log(`[Whop Membership] Found ${memberships.data?.length || 0} memberships`);
        
        // Find an active membership for our Pro plan
        const proMembership = memberships.data?.find((mem: any) => {
          const isActive = mem.status === 'active' || mem.status === 'trialing';
          console.log(`[Whop Membership] Membership ${mem.id}: status=${mem.status}, active=${isActive}, manage_url=${mem.manage_url ? 'yes' : 'no'}`);
          return isActive;
        });
        
        // Set cache control headers to prevent stale membership data
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        
        if (proMembership) {
          console.log(`[Whop Membership] Active membership found: ${proMembership.id}, manage_url: ${proMembership.manage_url}`);
          
          // Auto-sync: Upgrade user to Pro in database if they have active membership
          try {
            await storage.syncProStatus(whopUserId, true, proMembership.id);
            console.log(`[Whop Membership] Auto-upgraded user ${whopUserId} to Pro in database`);
          } catch (syncError: any) {
            console.error(`[Whop Membership] Failed to sync Pro status:`, syncError?.message);
          }
          
          res.json({
            hasMembership: true,
            membershipId: proMembership.id,
            status: proMembership.status,
            manageUrl: proMembership.manage_url || null,
            renewalPeriodEnd: proMembership.renewal_period_end || null,
            cancelAtPeriodEnd: proMembership.cancel_at_period_end || false,
          });
        } else {
          console.log(`[Whop Membership] No active membership found for user ${whopUserId}`);
          
          // Auto-sync: Downgrade user from Pro in database if they don't have active membership
          try {
            await storage.syncProStatus(whopUserId, false, null);
            console.log(`[Whop Membership] Auto-downgraded user ${whopUserId} from Pro in database`);
          } catch (syncError: any) {
            console.error(`[Whop Membership] Failed to sync Pro status:`, syncError?.message);
          }
          
          res.json({
            hasMembership: false,
            membershipId: null,
            status: null,
            manageUrl: null,
          });
        }
      } catch (error: any) {
        console.error("[Whop Membership] Error fetching membership:", error?.message);
        res.status(500).json({ error: "Could not fetch membership info" });
      }
    } catch (error) {
      console.error("Error getting membership:", error);
      res.status(500).json({ error: "Failed to get membership info" });
    }
  });

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  return httpServer;
}
