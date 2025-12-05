export interface BusinessProfile {
  name: string;
  niche: string;
  location: string;
  targetAudience: string;
  uniqueSellingPoints: string;
  socialMediaGoals: string;
}

export interface Persona {
  name: string;
  ageRange: string;
  description: string;
  painPoints: string[];
  interests: string[];
}

export interface ContentDay {
  day: string;
  theme: string;
  postIdea: string;
  format: 'Reels' | 'Story' | 'Carrossel' | 'Foto';
  captionHook: string;
}

export interface MarketingPlan {
  executiveSummary: string;
  personas: Persona[];
  contentPillars: string[];
  weeklySchedule: ContentDay[];
  suggestedHashtags: string[];
  growthTactics: string[];
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  data: MarketingPlan | null;
}
