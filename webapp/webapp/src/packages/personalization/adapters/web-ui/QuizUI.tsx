'use client'
import { useQuiz } from '@personalization/adapters/web-ui/useQuiz';

export default function QuizUI() {
  const { state, answerQuestion, nextQuestion, previousQuestion, submitQuiz, questions } = useQuiz();
 
  const current = state.currentQuestionIndex;
  const q = questions[current];
  const selected = state.answers[q.id] || '';
  const isLast = current === questions.length - 1;

  const handleNext = () => {
    if (isLast) {
      submitQuiz();
    } else {
      nextQuestion();
    }
  };

  if (state.isComplete) {
    return (
      <div className="p-4">
        <h2>Quiz Complete!</h2>
        <p>Thank you for completing the quiz.</p>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="p-4 text-red-600">
        <h2>Error</h2>
        <p>{state.error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-card text-card-foreground rounded-xl shadow">
      <div className="mb-4 text-lg font-semibold">Question {current + 1} of {questions.length}</div>
      <div className="mb-6 text-xl font-bold">{q.text}</div>
      <div className="space-y-2 mb-6">
        {q.options?.map((opt) => (
          <button
            key={opt.id}
            data-testid="quiz-answer"
            className={`w-full py-2 px-4 rounded-lg border border-border text-left transition-colors
              ${selected === opt.value
                ? 'bg-primary text-primary-foreground ring-2 ring-primary'
                : 'bg-accent text-accent-foreground hover:bg-primary/10 hover:border-primary'}
            `}
            onClick={() => { answerQuestion(q.id, opt.value); console.log('clicked'); } }
            type="button"
            aria-pressed={selected === opt.value}
          >
            {opt.text}
          </button>
        ))}
      </div>
      <div className="flex justify-between gap-2">
        <button
          onClick={previousQuestion}
          disabled={current === 0}
          className="px-4 py-2 rounded-lg bg-muted text-muted-foreground border border-border disabled:opacity-50"
          type="button"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!selected || state.isLoading}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground border border-primary disabled:opacity-50"
          type="button"
        >
          {state.isLoading ? 'Submitting...' : isLast ? 'Complete' : 'Next'}
        </button>
      </div>
    </div>
  );
} 