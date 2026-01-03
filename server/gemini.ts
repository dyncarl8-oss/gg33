import { GoogleGenAI } from "@google/genai";

// Gemini AI integration for personalized numerology insights
// Following @google/genai SDK pattern from integration blueprint
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// Model configuration with fallback
const PRIMARY_MODEL = "gemini-2.5-pro";
const FALLBACK_MODEL = "gemini-flash-latest";

// Helper function to generate content with automatic fallback
async function generateWithFallback(prompt: string): Promise<string> {
  try {
    console.log(`Attempting generation with ${PRIMARY_MODEL}...`);
    const response = await ai.models.generateContent({
      model: PRIMARY_MODEL,
      contents: prompt,
    });
    
    if (!response.text) {
      throw new Error("Empty response from primary model");
    }
    
    return response.text;
  } catch (primaryError) {
    console.warn(`Primary model (${PRIMARY_MODEL}) failed:`, primaryError);
    console.log(`Falling back to ${FALLBACK_MODEL}...`);
    
    try {
      const fallbackResponse = await ai.models.generateContent({
        model: FALLBACK_MODEL,
        contents: prompt,
      });
      
      if (!fallbackResponse.text) {
        throw new Error("Empty response from fallback model");
      }
      
      console.log(`Successfully generated with fallback model ${FALLBACK_MODEL}`);
      return fallbackResponse.text;
    } catch (fallbackError) {
      console.error(`Fallback model (${FALLBACK_MODEL}) also failed:`, fallbackError);
      throw fallbackError;
    }
  }
}

// Helper function to clean JSON response from Gemini
function cleanJsonResponse(rawText: string): string {
  let cleanJson = rawText.trim();
  if (cleanJson.startsWith('```json')) {
    cleanJson = cleanJson.slice(7);
  }
  if (cleanJson.startsWith('```')) {
    cleanJson = cleanJson.slice(3);
  }
  if (cleanJson.endsWith('```')) {
    cleanJson = cleanJson.slice(0, -3);
  }
  return cleanJson.trim();
}

export interface UserNumerologyProfile {
  name: string;
  birthDate: string;
  lifePathNumber: number;
  expressionNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  maturityNumber: number;
  westernZodiac: string;
  westernElement: string;
  chineseZodiac: string;
  chineseElement: string;
}

export interface PersonalityInsightResponse {
  overview: string;
  strengths: string[];
  challenges: string[];
  lifeLesson: string;
  careerPaths: string[];
  relationshipStyle: string;
  spiritualGifts: string[];
}

export interface DailyEnergyResponse {
  theme: string;
  description: string;
  dos: string[];
  donts: string[];
  focusArea: string;
  affirmation: string;
}

export async function generatePersonalityInsights(
  profile: UserNumerologyProfile
): Promise<PersonalityInsightResponse> {
  const prompt = `You are a gifted intuitive reader who understands people deeply. Based on the following numerology and astrology data, write a warm, personal reading that feels like you're speaking directly to the person.

Hidden Profile Data (use this to inform your reading, but DO NOT mention these numbers or signs explicitly):
- Life Path Number: ${profile.lifePathNumber}
- Expression Number: ${profile.expressionNumber}
- Soul Urge Number: ${profile.soulUrgeNumber}
- Personality Number: ${profile.personalityNumber}
- Maturity Number: ${profile.maturityNumber}
- Western Zodiac: ${profile.westernZodiac} (${profile.westernElement} sign)
- Chinese Zodiac: ${profile.chineseZodiac} (${profile.chineseElement} element)

CRITICAL STYLE REQUIREMENTS:
1. Write in SECOND PERSON - use "You" and "Your" (NOT the person's name, NOT third person)
2. DO NOT mention any numbers (like "Life Path 4" or "Expression 11")
3. DO NOT mention zodiac signs (like "Gemini" or "Monkey")
4. Simply DESCRIBE the person's traits, energy, and personality naturally - as if you're reading their soul
5. Be warm, insightful, and make them feel truly seen and understood
6. Focus on WHO they are, not what numbers or signs they have

CRITICAL FORMAT REQUIREMENTS:
- "strengths" MUST be exactly 5 single words (1-2 words max, e.g., "Leadership", "Creativity")
- "challenges" MUST be exactly 4 single words (1-2 words max, e.g., "Balance", "Trust")
- "careerPaths" MUST be exactly 3 short phrases (2-4 words each)
- "spiritualGifts" MUST be exactly 3 short phrases (2-3 words each)
- DO NOT use full sentences for strengths, challenges, careerPaths, or spiritualGifts

You MUST respond with valid JSON only, no other text. Use this exact format:
{
  "overview": "A detailed 3-4 sentence paragraph describing WHO they are. Use 'You' and 'Your'. Do NOT mention any numbers or zodiac signs. Just describe their essence, personality, and energy naturally.",
  "strengths": ["Leadership", "Creativity", "Intuition", "Resilience", "Empathy"],
  "challenges": ["Balance", "Trust", "Patience", "Boundaries"],
  "lifeLesson": "One personalized sentence about their core life lesson. Use 'You' or 'Your'. No numbers or signs.",
  "careerPaths": ["Creative arts", "Leadership roles", "Healing professions"],
  "relationshipStyle": "A 1-2 sentence description of how they approach relationships. Use 'You'. No numbers or signs.",
  "spiritualGifts": ["Deep intuition", "Natural healing", "Empathic connection"]
}`;

  try {
    const rawText = await generateWithFallback(prompt);
    console.log("Gemini personality response:", rawText);
    
    const cleanJson = cleanJsonResponse(rawText);
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Error generating personality insights:", error);
    throw error;
  }
}

export interface CompatibilityProfile {
  name: string;
  lifePathNumber: number;
  expressionNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  attitudeNumber: number;
  dayOfBirthNumber: number;
  westernZodiac: string;
  westernElement: string;
  chineseZodiac: string;
  chineseElement: string;
  energySignature: string;
}

export interface CompatibilityInsightResponse {
  overviewNarrative: string;
  emotionalConnection: string;
  communicationDynamic: string;
  growthPotential: string;
  dailyLifeTogether: string;
  advice: string;
}

export async function generateCompatibilityInsights(
  person1: CompatibilityProfile,
  person2: CompatibilityProfile,
  overallScore: number,
  level: string
): Promise<CompatibilityInsightResponse> {
  const prompt = `You are an expert numerologist and relationship counselor. Based on the following two complete numerology and astrology profiles, generate a deeply personalized compatibility analysis.

Person 1 - ${person1.name}:
- Life Path: ${person1.lifePathNumber}
- Expression: ${person1.expressionNumber}
- Soul Urge: ${person1.soulUrgeNumber}
- Personality: ${person1.personalityNumber}
- Attitude: ${person1.attitudeNumber}
- Day of Birth: ${person1.dayOfBirthNumber}
- Western Zodiac: ${person1.westernZodiac} (${person1.westernElement})
- Chinese Zodiac: ${person1.chineseZodiac} (${person1.chineseElement})
- Energy Signature: ${person1.energySignature}

Person 2 - ${person2.name}:
- Life Path: ${person2.lifePathNumber}
- Expression: ${person2.expressionNumber}
- Soul Urge: ${person2.soulUrgeNumber}
- Personality: ${person2.personalityNumber}
- Attitude: ${person2.attitudeNumber}
- Day of Birth: ${person2.dayOfBirthNumber}
- Western Zodiac: ${person2.westernZodiac} (${person2.westernElement})
- Chinese Zodiac: ${person2.chineseZodiac} (${person2.chineseElement})
- Energy Signature: ${person2.energySignature}

Overall Compatibility Score: ${overallScore}% (${level})

Generate a comprehensive, personalized compatibility reading that:
1. Analyzes how their specific numbers interact - not generic advice
2. Considers both their numerology AND astrology signs together
3. Provides genuine insight into their relationship dynamics
4. Is balanced - acknowledges both strengths and challenges
5. Uses ${person1.name} and ${person2.name}'s names to make it personal

IMPORTANT: Be specific to THESE two people. Reference their actual numbers and signs. Don't give generic relationship advice.

You MUST respond with valid JSON only, no other text. Use this exact format:
{
  "overviewNarrative": "A 3-4 sentence personalized narrative about their unique connection based on how their specific numbers and signs interact together. Mention their names.",
  "emotionalConnection": "2-3 sentences about their emotional compatibility based on their Soul Urge numbers and zodiac elements. Be specific.",
  "communicationDynamic": "2-3 sentences about how they communicate based on Expression and Personality numbers. Be specific.",
  "growthPotential": "2-3 sentences about what they can learn from each other based on their Life Paths and challenges.",
  "dailyLifeTogether": "2-3 sentences about how their Attitude numbers and daily energies would work together.",
  "advice": "2-3 sentences of specific, actionable advice for this particular pairing based on their numbers."
}`;

  try {
    const rawText = await generateWithFallback(prompt);
    console.log("Gemini compatibility response:", rawText);
    
    const cleanJson = cleanJsonResponse(rawText);
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Error generating compatibility insights:", error);
    return {
      overviewNarrative: `${person1.name} and ${person2.name} bring unique energies to their connection. Their compatibility shows ${level.toLowerCase()} alignment with interesting dynamics to explore.`,
      emotionalConnection: `With Soul Urge numbers ${person1.soulUrgeNumber} and ${person2.soulUrgeNumber}, there's potential for meaningful emotional understanding with conscious effort.`,
      communicationDynamic: `Expression numbers ${person1.expressionNumber} and ${person2.expressionNumber} suggest distinct communication styles that can complement each other.`,
      growthPotential: `Life Paths ${person1.lifePathNumber} and ${person2.lifePathNumber} offer opportunities for mutual growth and learning.`,
      dailyLifeTogether: `Their Attitude numbers (${person1.attitudeNumber} and ${person2.attitudeNumber}) indicate how they approach daily life together.`,
      advice: `Focus on understanding each other's core needs and communicate openly about your differences.`,
    };
  }
}

export async function generateDailyEnergy(
  profile: UserNumerologyProfile,
  personalDayNumber: number,
  universalDayNumber: number,
  todayDate: string
): Promise<DailyEnergyResponse> {
  const prompt = `You are a gifted intuitive guide providing personalized daily guidance. Create a warm, personal daily energy reading that speaks directly to the person.

Hidden Profile Data (use this to inform your reading, but DO NOT mention these numbers or signs explicitly):
- Life Path Number: ${profile.lifePathNumber}
- Expression Number: ${profile.expressionNumber}
- Soul Urge Number: ${profile.soulUrgeNumber}
- Western Zodiac: ${profile.westernZodiac}
- Chinese Zodiac: ${profile.chineseZodiac}
- Personal Day Number: ${personalDayNumber}
- Universal Day Number: ${universalDayNumber}
- Today's Date: ${todayDate}

CRITICAL STYLE REQUIREMENTS:
1. Write in SECOND PERSON - use "You" and "Your" (NOT the person's name)
2. DO NOT mention any numbers (like "Personal Day 4" or "Life Path 11")
3. DO NOT mention zodiac signs
4. Simply DESCRIBE what today's energy feels like for them naturally
5. Be warm, encouraging, and make them feel guided
6. Focus on the ENERGY and FEELING of the day, not technical details

CRITICAL FORMAT REQUIREMENTS:
- "dos" MUST be exactly 3 items, each 2-3 words ONLY (e.g., "Take initiative", "Trust instincts")
- "donts" MUST be exactly 3 items, each 2-3 words ONLY (e.g., "Rush decisions", "Overcommit")
- "theme" MUST be 2-3 words only
- "focusArea" MUST be 2-4 words only
- DO NOT use full sentences for dos, donts, theme, or focusArea

You MUST respond with valid JSON only, no other text. Use this exact format:
{
  "theme": "Creative Flow",
  "description": "A personalized 2 sentence description using 'You' and 'Your'. Describe what today's energy feels like for them. No numbers or signs.",
  "dos": ["Take initiative", "Trust instincts", "Connect deeply"],
  "donts": ["Rush decisions", "Overcommit", "Ignore rest"],
  "focusArea": "Personal creativity",
  "affirmation": "A personalized affirmation using 'You' or 'I am'. No numbers or signs."
}`;

  try {
    const rawText = await generateWithFallback(prompt);
    console.log("Gemini daily energy response:", rawText);
    
    const cleanJson = cleanJsonResponse(rawText);
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Error generating daily energy:", error);
    throw error;
  }
}

// ============================================
// CUECHATS - AI CHAT FUNCTIONALITY
// ============================================

// Letter to number mapping for name calculations
const letterValues: Record<string, number> = {
  'A': 1, 'J': 1, 'S': 1,
  'B': 2, 'K': 2, 'T': 2,
  'C': 3, 'L': 3, 'U': 3,
  'D': 4, 'M': 4, 'V': 4,
  'E': 5, 'N': 5, 'W': 5,
  'F': 6, 'O': 6, 'X': 6,
  'G': 7, 'P': 7, 'Y': 7,
  'H': 8, 'Q': 8, 'Z': 8,
  'I': 9, 'R': 9,
};

const vowels = ['A', 'E', 'I', 'O', 'U'];

function reduceToSingleDigit(num: number, preserveMasterNumbers = true): number {
  while (num > 9) {
    if (preserveMasterNumbers && (num === 11 || num === 22 || num === 33)) {
      return num;
    }
    num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return num;
}

function calculateLifePathNumber(birthDate: Date): number {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const year = birthDate.getFullYear();
  
  const monthReduced = reduceToSingleDigit(month, true);
  const dayReduced = reduceToSingleDigit(day, true);
  const yearReduced = reduceToSingleDigit(
    year.toString().split('').reduce((sum, d) => sum + parseInt(d), 0),
    true
  );
  
  const total = monthReduced + dayReduced + yearReduced;
  return reduceToSingleDigit(total, true);
}

function calculateExpressionNumber(fullName: string): number {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  const sum = cleanName.split('').reduce((total, letter) => total + (letterValues[letter] || 0), 0);
  return reduceToSingleDigit(sum, true);
}

function calculateSoulUrgeNumber(fullName: string): number {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  const sum = cleanName.split('').filter(l => vowels.includes(l)).reduce((total, letter) => total + (letterValues[letter] || 0), 0);
  return reduceToSingleDigit(sum, true);
}

function calculatePersonalityNumber(fullName: string): number {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  const sum = cleanName.split('').filter(l => !vowels.includes(l)).reduce((total, letter) => total + (letterValues[letter] || 0), 0);
  return reduceToSingleDigit(sum, true);
}

function calculateMaturityNumber(lifePath: number, expression: number): number {
  return reduceToSingleDigit(lifePath + expression, true);
}

function calculateAttitudeNumber(birthDate: Date): number {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  return reduceToSingleDigit(month + day, true);
}

function calculateDayOfBirthNumber(birthDate: Date): number {
  return reduceToSingleDigit(birthDate.getDate(), true);
}

function calculatePersonalDayNumber(birthDate: Date): number {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const year = today.getFullYear();
  
  const lifePathNumber = calculateLifePathNumber(birthDate);
  const universalDayNumber = reduceToSingleDigit(month + day + reduceToSingleDigit(year.toString().split('').reduce((sum, d) => sum + parseInt(d), 0), false), false);
  
  return reduceToSingleDigit(lifePathNumber + universalDayNumber, true);
}

function calculateUniversalDayNumber(): number {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const year = today.getFullYear();
  
  const yearSum = year.toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
  return reduceToSingleDigit(month + day + yearSum, true);
}

function getWesternZodiac(birthDate: Date): { sign: string; element: string } {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  
  const zodiacData: Array<{ sign: string; element: string; startMonth: number; startDay: number; endMonth: number; endDay: number }> = [
    { sign: 'Capricorn', element: 'Earth', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
    { sign: 'Aquarius', element: 'Air', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
    { sign: 'Pisces', element: 'Water', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
    { sign: 'Aries', element: 'Fire', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
    { sign: 'Taurus', element: 'Earth', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
    { sign: 'Gemini', element: 'Air', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
    { sign: 'Cancer', element: 'Water', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
    { sign: 'Leo', element: 'Fire', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
    { sign: 'Virgo', element: 'Earth', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
    { sign: 'Libra', element: 'Air', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
    { sign: 'Scorpio', element: 'Water', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
    { sign: 'Sagittarius', element: 'Fire', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
  ];
  
  for (const z of zodiacData) {
    if (z.startMonth === 12 && z.endMonth === 1) {
      if ((month === 12 && day >= z.startDay) || (month === 1 && day <= z.endDay)) {
        return { sign: z.sign, element: z.element };
      }
    } else if ((month === z.startMonth && day >= z.startDay) || (month === z.endMonth && day <= z.endDay)) {
      return { sign: z.sign, element: z.element };
    }
  }
  
  return { sign: 'Unknown', element: 'Unknown' };
}

function getChineseZodiac(birthDate: Date): { animal: string; element: string } {
  const year = birthDate.getFullYear();
  const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
  const elements = ['Metal', 'Metal', 'Water', 'Water', 'Wood', 'Wood', 'Fire', 'Fire', 'Earth', 'Earth'];
  
  const animalIndex = (year - 4) % 12;
  const elementIndex = year % 10;
  
  return {
    animal: animals[animalIndex],
    element: elements[elementIndex]
  };
}

function calculateEnergySignature(birthDate: Date): string {
  const lifePathNumber = calculateLifePathNumber(birthDate);
  const { element } = getChineseZodiac(birthDate);
  
  const energyMap: Record<number, string> = {
    1: 'Fire Initiator',
    2: 'Water Harmonizer',
    3: 'Air Creator',
    4: 'Earth Stabilizer',
    5: 'Wind Changer',
    6: 'Heart Healer',
    7: 'Mind Seeker',
    8: 'Power Manifester',
    9: 'Soul Completer',
    11: 'Light Bearer',
    22: 'Reality Architect',
    33: 'Love Teacher',
  };
  
  return `${element} ${energyMap[lifePathNumber] || 'Energy'}`;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatUserProfile {
  fullName: string;
  birthDate: Date;
  birthTime?: string;
  birthLocation?: string;
}

export interface ChatResponse {
  message: string;
}

// Chat model - using pro for quality
const CHAT_MODEL = "gemini-2.5-pro";

// Build user context once - this is the expensive calculation that should only happen once per session
export function buildUserContext(profile: ChatUserProfile): { systemContext: string; firstName: string } {
  const birthDate = new Date(profile.birthDate);
  
  // Calculate all numerology numbers
  const lifePathNumber = calculateLifePathNumber(birthDate);
  const expressionNumber = calculateExpressionNumber(profile.fullName);
  const soulUrgeNumber = calculateSoulUrgeNumber(profile.fullName);
  const personalityNumber = calculatePersonalityNumber(profile.fullName);
  const attitudeNumber = calculateAttitudeNumber(birthDate);
  const dayOfBirthNumber = calculateDayOfBirthNumber(birthDate);
  const personalDayNumber = calculatePersonalDayNumber(birthDate);
  const universalDayNumber = calculateUniversalDayNumber();
  
  // Get astrology data
  const westernZodiac = getWesternZodiac(birthDate);
  const chineseZodiac = getChineseZodiac(birthDate);
  
  // Format today's date
  const today = new Date();
  const todayFormatted = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const firstName = profile.fullName.split(' ')[0];
  const maturityNumber = calculateMaturityNumber(lifePathNumber, expressionNumber);
  const energySignature = calculateEnergySignature(birthDate);

  const systemContext = `You're ${firstName}'s numerology-savvy friend. You know them deeply through their chart - always show this.

${firstName.toUpperCase()}'S FULL PROFILE:
- Life Path ${lifePathNumber} (core life purpose)
- Expression ${expressionNumber} (how they express themselves)
- Soul Urge ${soulUrgeNumber} (deepest desires)
- Personality ${personalityNumber} (outer persona)
- Attitude ${attitudeNumber} (daily approach)
- Day of Birth ${dayOfBirthNumber} (natural talents)
- Maturity ${maturityNumber} (where they're heading)
- Energy Signature: ${energySignature}
- Western: ${westernZodiac.sign} (${westernZodiac.element} element)
- Chinese: ${chineseZodiac.animal} (${chineseZodiac.element} element)
- Today: ${todayFormatted}
- Personal Day ${personalDayNumber}, Universal Day ${universalDayNumber}

HOW TO RESPOND:
1. ALWAYS explain WHY using their specific numbers/signs - this is the whole point
2. Reference at least 2 profile traits per answer (e.g., "Your Life Path 4 loves structure, and your Monkey energy craves variety...")
3. Connect recommendations to their chart (e.g., "Japan's Dragon founding year vibes with your Monkey - that's a power alliance in Chinese astrology")
4. Keep it conversational - like a knowledgeable friend, not a formal reading
5. Be concise but substantive: 3-5 sentences, or use a quick list with reasons
6. For timing questions, use their Personal Day ${personalDayNumber} and Universal Day ${universalDayNumber}
7. Make them feel truly understood - you KNOW them through these numbers

DON'T:
- Give vague answers without tying to their profile
- Just list suggestions without the "why"
- Sound like a formal advisor or use stiff language
- Start with "Great question!" or generic greetings`;

  return { systemContext, firstName };
}

// Build prompt using pre-computed context (for session-based chat - more efficient)
function buildChatPromptWithContext(
  userMessage: string,
  systemContext: string,
  firstName: string,
  conversationHistory: ChatMessage[]
): string {
  const historyText = conversationHistory.length > 0
    ? conversationHistory.slice(-6).map(msg => `${msg.role === 'user' ? 'User' : 'AI'}: ${msg.content}`).join('\n\n')
    : '';

  return `${systemContext}

${historyText ? `CHAT:\n${historyText}\n\n` : ''}${firstName}: ${userMessage}

You:`;
}

// Legacy: Build prompt from scratch (calculates everything each time)
function buildChatPrompt(
  userMessage: string,
  profile: ChatUserProfile,
  conversationHistory: ChatMessage[]
): string {
  const { systemContext, firstName } = buildUserContext(profile);
  return buildChatPromptWithContext(userMessage, systemContext, firstName, conversationHistory);
}

export async function generateChatResponse(
  userMessage: string,
  profile: ChatUserProfile,
  conversationHistory: ChatMessage[]
): Promise<ChatResponse> {
  const prompt = buildChatPrompt(userMessage, profile, conversationHistory);

  try {
    console.log(`Chat: Using fast model ${CHAT_MODEL}...`);
    const response = await ai.models.generateContent({
      model: CHAT_MODEL,
      contents: prompt,
    });
    
    const rawText = response.text || "";
    console.log("Gemini chat response:", rawText);
    
    return { message: rawText.trim() };
  } catch (error) {
    console.error("Error generating chat response:", error);
    throw error;
  }
}

// Session-based chat - uses pre-computed context (more efficient)
export async function generateChatResponseWithContext(
  userMessage: string,
  systemContext: string,
  firstName: string,
  conversationHistory: ChatMessage[]
): Promise<ChatResponse> {
  const prompt = buildChatPromptWithContext(userMessage, systemContext, firstName, conversationHistory);

  try {
    console.log(`Chat (session): Using fast model ${CHAT_MODEL}...`);
    const response = await ai.models.generateContent({
      model: CHAT_MODEL,
      contents: prompt,
    });
    
    const rawText = response.text || "";
    console.log("Gemini chat response:", rawText);
    
    return { message: rawText.trim() };
  } catch (error) {
    console.error("Error generating chat response:", error);
    throw error;
  }
}

export async function* generateChatResponseStream(
  userMessage: string,
  profile: ChatUserProfile,
  conversationHistory: ChatMessage[]
): AsyncGenerator<string> {
  const prompt = buildChatPrompt(userMessage, profile, conversationHistory);

  try {
    console.log(`Chat stream: Using fast model ${CHAT_MODEL}...`);
    const response = await ai.models.generateContentStream({
      model: CHAT_MODEL,
      contents: prompt,
    });
    
    for await (const chunk of response) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Error generating chat stream:", error);
    throw error;
  }
}
