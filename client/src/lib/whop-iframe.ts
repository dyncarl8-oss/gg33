import { createSdk } from "@whop/iframe";

export const iframeSdk = createSdk({
  appId: import.meta.env.VITE_WHOP_APP_ID,
});
