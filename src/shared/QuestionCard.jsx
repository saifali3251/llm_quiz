export default function QuestionCard({ question, selected, onSelect, showAnswer }) {
    return (
      <div className="question-card">
        <h3>{question.question}</h3>
        <ul>
          {question.options.map((opt, i) => (
            <li
              key={i}
              onClick={() => !showAnswer && onSelect(opt)}
              className={`option ${selected === opt ? 'selected' : ''} ${showAnswer && opt === question.correctAnswer ? 'correct' : ''} ${showAnswer && selected === opt && opt !== question.correctAnswer ? 'wrong' : ''}`}
            >
              {opt}
            </li>
          ))}
        </ul>
        {showAnswer && <p className="explanation">{question.explanation}</p>}
      </div>
    );
  }