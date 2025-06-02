'use client';
import { QuizProvider } from '@personalization/adapters/web-ui/QuizProvider';
import QuizUI from '@personalization/adapters/web-ui/QuizUI';
import { useNavigation } from '@shared/adapters/web-ui/hooks/useNavigation';

export function QuizPage() {
  const navigation = useNavigation();
  const handleComplete = (params: Record<string, string>) => {
    const search = new URLSearchParams(params).toString();
    navigation.navigate(`/results${search ? `?${search}` : ''}`);
  };
  return (
    <QuizProvider onComplete={handleComplete}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <QuizUI />
      </div>
    </QuizProvider>
  );
}
