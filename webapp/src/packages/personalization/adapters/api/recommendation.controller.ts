import { HTTPRequest, HTTPResponse } from '@shared/application/entities/http.entity';
import { GenerateRecommendationUseCase } from '@personalization/application/use-cases';
import { QuizAnswer } from '@personalization/domain';

export class RecommendationController {
  constructor(
    private generateRecommendationUseCase: GenerateRecommendationUseCase
  ) {}

async getRecommendation(request: HTTPRequest): Promise<HTTPResponse> {
    try {
        const quizAnswers = Object.entries(request.query || {}).map(([key, value]) => ({
            questionId: key,
            value,
            timestamp: new Date()
        }));
     
        if (!quizAnswers) {
          return {
            status: 400,
            body: { error: 'Valid quiz answers are required' }
          };
        }

        // Convert to domain objects
        const answers: QuizAnswer[] = quizAnswers.map((answer: unknown) => {
          const a = answer as QuizAnswer;
          return {
            questionId: a.questionId,
            value: a.value,
            timestamp: new Date(a.timestamp || Date.now())
          };
        });

        const recommendations = await this.generateRecommendationUseCase.execute(answers);
        
        return {
          status: 200,
          body: { resorts: recommendations }
        };
    } catch (error) {
      console.error('Recommendation generation failed:', error);
      return {
        status: 500,
        body: { error: 'Failed to generate recommendation' }
      };
    }
  }
} 