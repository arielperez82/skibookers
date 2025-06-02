import { Quiz, QuizAnswer, UserPreferences } from '@personalization/domain';

export interface QuizRepository {
  getPersonalizationQuiz(): Promise<Quiz>;
  saveAnswer(userId: string, answer: QuizAnswer): Promise<void>;
  getAnswersByUser(userId: string): Promise<QuizAnswer[]>;
  calculatePreferences(answers: QuizAnswer[]): Promise<UserPreferences>;
  trackQuizStart(userId: string, quizId: string): Promise<void>;
} 