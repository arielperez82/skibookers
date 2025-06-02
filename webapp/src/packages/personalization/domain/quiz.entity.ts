export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  estimatedMinutes: number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: 'single-choice' | 'multiple-choice' | 'scale' | 'text';
  options?: QuizOption[];
  category: 'experience' | 'terrain' | 'amenities' | 'budget' | 'travel-style';
  weight: number;
  required: boolean;
}

export interface QuizOption {
  id: string;
  text: string;
  value: string;
}

export interface QuizAnswer {
  questionId: string;
  value: string | string[] | number;
  timestamp: Date;
}