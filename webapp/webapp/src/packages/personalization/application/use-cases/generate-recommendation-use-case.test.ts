/* eslint-disable @typescript-eslint/no-unused-vars */
import { GenerateRecommendationUseCase } from '@personalization/application/use-cases/generate-recommendation-use-case';
import { QuizRepository } from '@personalization/application/ports/quiz-repository';
import { RecommendationService } from '@personalization/application/ports/recommendation-service';

type QuizAnswer = {
  questionId: string;
  value: string | string[] | number;
  timestamp: Date;
};

class MockQuizRepository {
  async calculatePreferences(answers: QuizAnswer[]) {
    return { userId: 'test', experienceLevel: 'intermediate' };
  }
}

class MockRecommendationService {
  async generateRecommendations(preferences: unknown) {
    const resorts = [{
      id: '1',
      name: 'Test Resort',
      image: 'https://example.com/test.jpg',
      matchPercent: 85,
      description: 'A great test resort.',
      match: 85,
      conditions: { label: 'Excellent', icon: '😃' },
      skill: 'Intermediate',
      runs: 20,
      region: 'Alps',
      budget: '€1000–€2000',
      vibe: 'Adventure/Sporty',
      groupType: 'Friends',
      reasons: ['Great match', 'Fits your preferences'],
      suggestedBundle: {
        id: 'bundle-1',
        name: 'Test Bundle',
        description: 'A special offer for your test resort.',
        price: 1200
      }
    }]; 

    return resorts;
  }
  async saveRecommendation() {}
}

describe('GenerateRecommendationUseCase', () => {
  it('should generate recommendation from quiz answers', async () => {
    const useCase = new GenerateRecommendationUseCase(
      new MockQuizRepository() as QuizRepository,
      new MockRecommendationService() as RecommendationService
    );
    const result = await useCase.execute([{ questionId: 'q1', value: 'intermediate', timestamp: new Date() }]);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Test Resort');
    expect(result[0].matchPercent).toBe(85);   
  });
});