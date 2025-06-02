import { createContext } from 'react';
import { QuizQuestion } from '@personalization/domain/quiz.entity';

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, unknown>;
  isComplete: boolean;
  isLoading: boolean;
  error: string | null;
}

export type QuizAction = 
  | { type: 'ANSWER_QUESTION'; payload: { questionId: string; value: unknown } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'COMPLETE_QUIZ' };

export const initialState: QuizState = {
  currentQuestionIndex: 0,
  answers: {},
  isComplete: false,
  isLoading: false,
  error: null
};

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'ANSWER_QUESTION':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.value
        },
        error: null
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1
      };
    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1)
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'COMPLETE_QUIZ':
      return { ...state, isComplete: true, isLoading: false };
    default:
      return state;
  }
}

export const QUESTIONS: QuizQuestion[] = [
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
  {
    id: 'terrain',
    text: 'What type of terrain do you prefer?',
    type: 'single-choice',
    category: 'terrain',
    weight: 1.0,
    required: true,
    options: [
      { id: 'groomed', text: 'Groomed', value: 'groomed' },
      { id: 'powder', text: 'Powder', value: 'powder' },
      { id: 'park', text: 'Park', value: 'park' },
      { id: 'mixed', text: 'Mixed', value: 'mixed' }
    ]
  },
  {
    id: 'price',
    text: 'What is your price range per person (excluding flights)?',
    type: 'single-choice',
    category: 'budget',
    weight: 1.0,
    required: true,
    options: [
      { id: 'low', text: '< €1000', value: '<1000' },
      { id: 'mid', text: '€1000–€2000', value: '1000-2000' },
      { id: 'high', text: '€2000–€4000', value: '2000-4000' },
      { id: 'luxury', text: '€4000+', value: '>4000' }
    ]
  },
  {
    id: 'vibe',
    text: 'What vibe are you looking for?',
    type: 'single-choice',
    category: 'amenities',
    weight: 1.0,
    required: true,
    options: [
      { id: 'family', text: 'Family-friendly', value: 'family' },
      { id: 'party', text: 'Party/Après', value: 'party' },
      { id: 'luxury', text: 'Luxury/Relaxation', value: 'luxury' },
      { id: 'adventure', text: 'Adventure/Sporty', value: 'adventure' }
    ]
  }
];

export interface QuizContextType {
  state: QuizState;
  answerQuestion: (questionId: string, value: unknown) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitQuiz: () => Promise<void>;
  questions: QuizQuestion[];
}

export const QuizContext = createContext<QuizContextType | null>(null); 