import { GoogleGenAI, Type, Schema } from "@google/genai";
import { BusinessProfile, MarketingPlan } from "../types";

// Define the response schema for strict JSON output
const planSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    executiveSummary: {
      type: Type.STRING,
      description: "A professional summary of the digital strategy.",
    },
    personas: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          ageRange: { type: Type.STRING },
          description: { type: Type.STRING },
          painPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
          interests: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["name", "ageRange", "description", "painPoints"],
      },
    },
    contentPillars: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3-4 main themes for content (e.g., Educational, Community).",
    },
    weeklySchedule: {
      type: Type.ARRAY,
      description: "A 7-day content calendar.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING },
          theme: { type: Type.STRING },
          postIdea: { type: Type.STRING },
          format: { type: Type.STRING, enum: ["Reels", "Story", "Carrossel", "Foto"] },
          captionHook: { type: Type.STRING, description: "First sentence of the caption." },
        },
        required: ["day", "theme", "postIdea", "format", "captionHook"],
      },
    },
    suggestedHashtags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    growthTactics: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Actionable tips to grow followers and engagement.",
    },
  },
  required: [
    "executiveSummary",
    "personas",
    "contentPillars",
    "weeklySchedule",
    "suggestedHashtags",
    "growthTactics",
  ],
};

export const generateMediaPlan = async (
  profile: BusinessProfile
): Promise<MarketingPlan> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Act as a senior Digital Marketing Strategist specializing in local Brazilian retail businesses.
    Create a comprehensive Digital Media Plan for the following business:

    Name: ${profile.name}
    Niche: ${profile.niche}
    Location: ${profile.location}
    Target Audience Details: ${profile.targetAudience}
    Unique Selling Points: ${profile.uniqueSellingPoints}
    Goals: ${profile.socialMediaGoals}

    Context from images analyzed previously: 
    - This appears to be a family-owned supermarket ("Nossa família atendendo a sua").
    - They focus on fresh produce (Hortifruti), bakery, and community events (Teachers' Day, Christmas).
    - The tone should be warm, inviting, and community-centric.
    - Please respond in PORTUGUESE (Brasil).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: planSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No content generated.");
    }

    return JSON.parse(text) as MarketingPlan;
  } catch (error) {
    console.error("Error generating plan:", error);
    throw error;
  }
};
