"use client";
import React, { useState, useEffect, use } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Question = {
  id: string;
  text: string;
  answers: { id: string; text: string }[];
};

export default function TakeQuizPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {

  const { quizId } = use(params);
  const router = useRouter();
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<
    { questionId: string; answerIds: string[] }[]
  >([]);
  const [score, setScore] = useState<number | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/auth/me");
      const data = await response.json();

      if (response.ok) {
        setUserId(data.user.user.id);
      } else {
        toast.error("Please Login First !");
        router.push("/login");
      }
    };

    const fetchQuiz = async () => {
      const response = await fetch(`/api/quiz/${quizId}`);
      const data = await response.json();
      setQuizTitle(data.title);
      setQuestions(data.questions);
    };

    fetchUser();
    fetchQuiz();
  }, [quizId, router]);

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setUserAnswers((prevAnswers) => {
      const existing = prevAnswers.find((a) => a.questionId === questionId);

      if (existing) {
        const isSelected = existing.answerIds.includes(answerId);
        const updatedAnswers = isSelected
          ? existing.answerIds.filter((id) => id !== answerId)
          : [...existing.answerIds, answerId];

        return prevAnswers.map((a) =>
          a.questionId === questionId
            ? { questionId, answerIds: updatedAnswers }
            : a
        );
      }

      return [...prevAnswers, { questionId, answerIds: [answerId] }];
    });
  };

  const handleSubmit = async () => {
    if (!userId) {
      alert("User not logged in!");
      return;
    }

    console.log("Submitting quiz", userAnswers);
    const response = await fetch("/api/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, quizId, answers: userAnswers }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Quiz submitted", result);
      setScore(result.score);
    } else {
      alert(result.error || "Failed to submit quiz");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{quizTitle}</h1>
      {questions.map((question) => (
        <div
          key={question.id}
          className="mb-4 p-4 border border-gray-200 rounded"
        >
          <h2 className="text-lg font-semibold mb-2">{question.text}</h2>
          <div>
            {question.answers.map((answer) => {
              const selected = userAnswers
                .find((a) => a.questionId === question.id)
                ?.answerIds.includes(answer.id);
              return (
                <label
                  key={answer.id}
                  className={`block mb-2 ${
                    selected ? "text-indigo-600 font-semibold" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    value={answer.id}
                    checked={selected || false}
                    onChange={() => handleAnswerSelect(question.id, answer.id)}
                    className="mr-2"
                  />
                  {answer.text}
                </label>
              );
            })}
          </div>
        </div>
      ))}
      {score === null ? (
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Submit Quiz
        </button>
      ) : (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Your Score: {score} / 100</h2>
        </div>
      )}
    </div>
  );
}
