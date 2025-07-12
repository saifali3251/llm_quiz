
// src/pages/ResultPage.tsx
export default function ResultPage({ score, total, onRetry, onRestart }) {
    return (
      <div className="result-page">
        <h2>Quiz Completed!</h2>
        <p>Score: {score} / {total}</p>
        <button onClick={onRetry}>Try Again</button>
        <button onClick={onRestart}>Start Over</button>
      </div>
    );
  }
  