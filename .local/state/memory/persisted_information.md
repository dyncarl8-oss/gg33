# GG33 - Complete Application Understanding

## Overview
GG33 "Cue Your Life" is a spiritual numerology and Chinese astrology web application designed as a Whop app. It helps users make informed decisions about relationships, business, and life events by combining Western numerology with Chinese zodiac systems.

## Core Features
1. **Profile Setup & Onboarding** - 4-step wizard collecting fullName, birthDate, birthTime, birthLocation
2. **Numerology Calculations** - Life Path, Expression, Soul Urge, Personality, Maturity, Attitude, Day of Birth numbers
3. **Astrology Integration** - Western Zodiac (12 signs, elements, modalities) + Chinese Zodiac (12 animals, 5 elements, Yin/Yang)
4. **Daily Energy Readings** - AI-generated personalized daily guidance based on Personal Day + Universal Day numbers
5. **Personality Insights** - AI-generated comprehensive personality analysis stored in MongoDB
6. **Compatibility Analysis** - AI-powered relationship compatibility between two birth profiles (Pro feature)
7. **CueChats AI** - Context-aware AI chat using user's full numerology profile (Pro feature)
8. **Cues Database** - 22,000+ pre-calculated entities (brands, locations, celebrities) with numerology data (Pro feature)
9. **Study Zone** - Courses on GG33 numerology with lesson tracking (Pro feature)
10. **Explore Features** - Trending energies, best days, celebrity matches, travel destinations, career alignment

## Tech Stack
### Frontend
- React 18 + TypeScript + Vite
- wouter for routing
- TanStack Query for data fetching
- Shadcn UI + Radix UI components
- Tailwind CSS with Frosted UI design system (glass morphism, amber/gold accents)
- Custom 12-step Radix color scales

### Backend
- Express.js + TypeScript
- MongoDB with Mongoose ODM
- Gemini AI (@google/genai) for AI features
- Whop SDK (@whop/sdk) for authentication and payments

## Key Files
- `client/src/lib/numerology.ts` - Core numerology calculation algorithms (1283 lines)
- `server/gemini.ts` - AI integration with fallback models
- `server/storage.ts` - MongoStorage class for all data operations
- `server/whop.ts` - Whop SDK authentication middleware
- `server/routes.ts` - All API endpoints
- `server/db.ts` - MongoDB schemas (User, DailyEnergy, PersonalityInsight)
- `client/src/context/WhopContext.tsx` - Whop context for basePath handling

## Database Models (MongoDB)
1. **User** - odisId, whopUserId, fullName, birthDate, birthTime, birthLocation, isPro, whopUsername, whopProfilePictureUrl
2. **DailyEnergy** - odisId, date, personalDayNumber, universalDayNumber, theme, description, dos, donts, focusArea, affirmation
3. **PersonalityInsight** - odisId, overview, strengths, challenges, lifeLesson, careerPaths, relationshipStyle, spiritualGifts

## Routing Structure
- `/experiences/:experienceId/*` - Whop Experience View (customers)
- `/dashboard/:companyId/*` - Whop Dashboard View (admins)
- `/` - Standalone view

### Pages
- home.tsx - Main dashboard with profile overview, daily energy, personality insights
- compatibility.tsx - Compatibility analysis (Pro)
- cues.tsx - Cues database browser (Pro)
- cuechats.tsx - AI chat interface (Pro)
- explore.tsx - Discovery features
- learn.tsx - Study Zone courses
- course.tsx / lesson.tsx - Course content
- number-detail.tsx - Detailed number meanings

## Pro Membership
- Managed through Whop in-app purchases
- Pro status synced via `/api/membership` endpoint
- Features gated: Compatibility, Cues Database, CueChats, Study Zone
- UpgradeModal component handles purchase flow

## Environment Variables
- MONGODB_URI - MongoDB Atlas connection
- GEMINI_API_KEY - Google Gemini AI
- WHOP_API_KEY - Whop SDK API key
- WHOP_APP_ID - Whop app identifier

## Design System
- Dark-first design with glass morphism
- Amber/gold gradient CTAs (variant="gold")
- Card variants: default, frosted, glass, elevated, glow, cosmic
- Button variants: default, gold, hero, frosted, glass, glow
- StarField animated background component
- 12-step typography (text-0 to text-9)

## User asked me to understand everything - task complete. Ready for next instructions.
