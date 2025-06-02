import { QuizRepository } from '@personalization/application/ports/quiz-repository';
import { ExperienceLevel, Quiz, QuizAnswer, TravelStyle, UserPreferences, BudgetRange } from '@personalization/domain';
import { createClient } from '@shared/adapters/supabase/client';

const supabase = createClient;

export class SupabaseQuizRepository implements QuizRepository {
  async getPersonalizationQuiz(): Promise<Quiz> {
    // For now, return a hardcoded quiz
    // TODO: Fetch from database once quiz table is set up
    return {
      id: 'personalization-quiz-v1',
      title: 'Ski Vacation Personalization',
      description: 'Help us find your perfect ski resort',
      estimatedMinutes: 5,
      questions: [
        {
          id: 'experience',
          text: 'What is your skiing experience level?',
          type: 'single-choice',
          category: 'experience',
          weight: 1.0,
          required: true,
          options: [
            { id: 'beginner', text: 'Beginner', value: 'beginner' },
            { id: 'intermediate', text: 'Intermediate', value: 'intermediate' },
            { id: 'advanced', text: 'Advanced', value: 'advanced' },
            { id: 'expert', text: 'Expert', value: 'expert' }
          ]
        },
        // Add more questions as needed
      ]
    };
  }

  async saveAnswer(userId: string, answer: QuizAnswer): Promise<void> {
    const { error } = await supabase
      .from('quiz_answers')
      .upsert({
        user_id: userId,
        question_id: answer.questionId,
        answer_value: answer.value,
        created_at: answer.timestamp.toISOString()
      });
    
    if (error) {
      throw new Error(`Failed to save quiz answer: ${error.message}`);
    }
  }

  async getAnswersByUser(userId: string): Promise<QuizAnswer[]> {
    const { data, error } = await supabase
      .from('quiz_answers')
      .select('*')
      .eq('user_id', userId);
    
    if (error) {
      throw new Error(`Failed to get quiz answers: ${error.message}`);
    }
    
    return data?.map(row => ({
      questionId: row.question_id,
      value: row.answer_value,
      timestamp: new Date(row.created_at)
    })) || [];
  }

  async calculatePreferences(answers: QuizAnswer[]): Promise<UserPreferences> {
    // Implement preference calculation logic
    // For now, return basic calculation
    const experienceAnswer = answers.find(a => a.questionId === 'experience');
    const terrainAnswer = answers.find(a => a.questionId === 'terrain');
    const priceAnswer = answers.find(a => a.questionId === 'price');
    const vibeAnswer = answers.find(a => a.questionId === 'vibe');
    
    return {
      userId: 'current-user', // TODO: Get from auth context
      experienceLevel: (experienceAnswer?.value as ExperienceLevel) || 'intermediate',
      terrainPreference: terrainAnswer?.value as string || 'mixed',
      budgetRange: BudgetRange.fromStringRange(priceAnswer?.value as string || '1000-2000'),
      travelStyle: vibeAnswer?.value as TravelStyle || 'budget',
    };
  }

  async trackQuizStart(userId: string, quizId: string): Promise<void> {
    const { error } = await supabase
      .from('quiz_sessions')
      .insert({
        user_id: userId,
        quiz_id: quizId,
        started_at: new Date().toISOString()
      });
    
    if (error) {
      console.warn('Failed to track quiz start:', error.message);
    }
  }
} 