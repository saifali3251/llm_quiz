import { useEffect, useState } from 'react';
import { Button } from './items/Button';

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/generate-questions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: "Generate 5 multiple-choice questions about the TV show Friends. Each question should have 4 options and include the correct answer and a detailed explanation. Format as JSON."
        })
      });

      const data = await response.json();
      setQuestions(data.questions || []);
    } catch (error) {
      console.error("Error fetching questions", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Friends Quiz</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        questions?.questions?.map((q, idx) => (
          <div key={idx} className="mb-6 border p-4 rounded shadow">
            <p className="font-medium">{idx + 1}. {q.question}</p>
            <ul className="mt-2 space-y-1">
              {q.options.map((opt, i) => (
                <li key={i}>🔘 {opt}</li>
              ))}
            </ul>
            <p className="text-green-600 mt-2">✅ Correct Answer: {q.correctAnswer}</p>
            <p className="text-gray-500 text-sm">📘 {q.explanation}</p>
          </div>
        ))
      )}

      <Button onClick={fetchQuestions}>Regenerate Questions</Button>
    </div>
  );
};

export default QuizApp;
