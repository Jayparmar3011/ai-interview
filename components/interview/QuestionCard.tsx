"use client";

import { useState } from "react";

const questions = [
  "Tell me about yourself",
  "Explain React hooks",
  "What is TypeScript?",
];

export default function QuestionCard() {
  const [index, setIndex] = useState(0);

  return (
    <div className="bg-white/5 p-6 rounded-xl space-y-4">
      <p>
        Question {index + 1} of {questions.length}
      </p>

      <h2 className="text-xl font-semibold">{questions[index]}</h2>

      <button
        onClick={() =>
          setIndex((prev) => Math.min(prev + 1, questions.length - 1))
        }
        className="bg-cyan-500 px-4 py-2 rounded"
      >
        Next Question
      </button>
    </div>
  );
}
