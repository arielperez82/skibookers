import { UserPreferences, ResortRecommendation } from '@personalization/domain';

export interface RecommendationService {
  generateRecommendations(preferences: UserPreferences): Promise<ResortRecommendation[]>;
  saveRecommendation(userId: string, recommendation: ResortRecommendation): Promise<void>;
} 