
// src/pages/QuizPage.tsx
import React, { useState } from 'react';
import QuestionCard from '../shared/QuestionCard';
import ProgressBar from '../shared/ProgressBar';

export default function QuizPage({ questions, score, setScore, onComplete }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const current = questions[index];
  const isCorrect = selected === current.correctAnswer;

  const handleNext = () => {
    if (isCorrect) setScore(score + 1);
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="quiz-page">
      <ProgressBar progress={(index + 1) / questions.length} />
      <QuestionCard
        question={current}
        selected={selected}
        showAnswer={showAnswer}
        onSelect={setSelected}
      />
      <button disabled={!selected} onClick={() => setShowAnswer(true)}>
        Submit
      </button>
      {showAnswer && (
        <button onClick={handleNext}>
          {index + 1 === questions.length ? 'Finish' : 'Next'}
        </button>
      )}
    </div>
  );
}