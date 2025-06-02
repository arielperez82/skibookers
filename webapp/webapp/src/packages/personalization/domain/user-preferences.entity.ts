export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type TravelStyle = 'luxury' | 'budget' | 'family' | 'romantic' | 'adventure';

export interface UserPreferences {
  userId: string;
  experienceLevel: ExperienceLevel;
  terrainPreference: string;
  budgetRange: { min: number; max: number };
  travelStyle: TravelStyle;
} 