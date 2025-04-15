"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Question {
  text: string;
}

interface AiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (answers: Record<string, string>) => void;
  sectionTitle: string;
  questions: Question[];
}

export default function AiModal({
  isOpen,
  onClose,
  onContinue,
  sectionTitle,
  questions,
}: AiModalProps) {
  // Change the state type to use indices as keys
  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    // Initialize with an object created from questions using indices
    const initialAnswers: Record<number, string> = {};
    questions.forEach((_, index) => {
      initialAnswers[index] = "";
    });
    return initialAnswers;
  });

  if (!isOpen) return null;

  // Update the handleAnswerChange function to use index instead of questionText
  const handleAnswerChange = (index: number, value: string) => {
    // Update the specific question's answer in the object
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleContinue = () => {
    // Create a question-answer mapping to pass to the parent component
    const questionAnswerPairs: Record<string, string> = {};
    questions.forEach((question, index) => {
      questionAnswerPairs[question.text] = answers[index];
    });

    // Pass the key-pair object to the parent component
    onContinue(questionAnswerPairs);

    // Reset answers
    const resetAnswers: Record<number, string> = {};
    questions.forEach((_, index) => {
      resetAnswers[index] = "";
    });
    setAnswers(resetAnswers);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">
          Number of Questions to generate{" "}
          {sectionTitle[0].toUpperCase() + sectionTitle.slice(1)}?
        </h2>

        <p className="text-blue-600 mb-6">500 credits left</p>
        <div className="h-[470px] overflow-y-auto px-2">
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 mb-2">
                Q{index + 1} : {question?.text}{" "}
              </label>
              <input
                type="text"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <div className="text-gray-600">Required Credits: 5</div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleContinue}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
