'use client';

import { useReducer, ReactNode } from 'react';
import { QuizContext, quizReducer, initialState, QUESTIONS } from './quiz-context';

export function QuizProvider({ children, onComplete }: { children: ReactNode; onComplete?: (params: Record<string, string>) => void }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const answerQuestion = (questionId: string, value: unknown) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: { questionId, value } });
  };

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const previousQuestion = () => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  };

  const submitQuiz = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
       
      // Map quiz answers to search params for /results
      const params: Record<string, string> = {};
      if (state.answers['experience']) params['experience'] = String(state.answers['experience']);
      if (state.answers['terrain']) params['terrain'] = String(state.answers['terrain']);
      if (state.answers['price']) params['price'] = String(state.answers['price']);
      if (state.answers['vibe']) params['vibe'] = String(state.answers['vibe']);
      // Optionally add more mappings as needed
      if (onComplete) onComplete(params);
      dispatch({ type: 'COMPLETE_QUIZ' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  return (
    <QuizContext.Provider value={{
      state,
      answerQuestion,
      nextQuestion,
      previousQuestion,
      submitQuiz,
      questions: QUESTIONS
    }}>
      {children}
    </QuizContext.Provider>
  );
}