import { QuizAnswer, ResortRecommendation } from '@personalization/domain';
import { QuizRepository } from '@personalization/application/ports/quiz-repository';
import { RecommendationService } from '@personalization/application/ports/recommendation-service';

export class GenerateRecommendationUseCase {
  constructor(
    private quizRepository: QuizRepository,
    private recommendationService: RecommendationService
  ) {}

  async execute(quizAnswers: QuizAnswer[]): Promise<ResortRecommendation[]> {
    // Validate inputs
    if (!quizAnswers || quizAnswers.length === 0) {
      throw new Error('Quiz answers are required');
    }

    // Convert answers to preferences
    const preferences = await this.quizRepository.calculatePreferences(quizAnswers);
    
    // Generate recommendations
    const recommendations = await this.recommendationService.generateRecommendations(preferences);
    
    // Optionally save recommendations (first one)
    if (recommendations.length > 0) {
      await this.recommendationService.saveRecommendation(preferences.userId, recommendations[0]);
    }
    
    return recommendations;
  }
} 