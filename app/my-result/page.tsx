"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

type Result = {
  score: number;
  created_at: string;
};

type GroupedResults = {
  [quizId: string]: Result[];
};

export default function ResultsPage() {
  const [results, setResults] = useState<GroupedResults | null>(null);
  const [openQuizzes, setOpenQuizzes] = useState<Record<string, boolean>>({});
  const router = useRouter();
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

    const fetchResults = async () => {
      if (!userId) return;

      const response = await fetch(`/api/quiz/myresults?userId=${userId}`);
      const data = await response.json();

      if (response.ok) {
        setResults(data);
        // Initialize dropdown states for each quiz to be closed
        setOpenQuizzes(
          Object.keys(data).reduce((acc, key) => ({ ...acc, [key]: false }), {})
        );
      } else {
        toast.error(data.error || "Failed to load results.");
        if (data.error === "User not logged in") {
          router.push("/login");
        }
      }
    };

    fetchUser();
    fetchResults();
  }, [router, userId]);

  const toggleQuiz = (quizId: string) => {
    setOpenQuizzes((prev) => ({
      ...prev,
      [quizId]: !prev[quizId],
    }));
  };

  if (!results) return <Loading />;

  return (
    <div className="flex flex-col h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Quiz Results</h1>
      <div className="overflow-auto flex-grow">
        {Object.keys(results).length === 0 ? (
          <p className="text-center">No quiz results found.</p>
        ) : (
          Object.entries(results).map(([quizId, quizResults]) => (
            <div key={quizId} className="mb-4 border rounded bg-white shadow">
              <div
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleQuiz(quizId)}
              >
                <h2 className="text-lg font-semibold">Quiz {quizId}</h2>
                <button className="text-sm text-gray-500">
                  {openQuizzes[quizId] ? "Hide" : "Show"}
                </button>
              </div>
              {openQuizzes[quizId] && (
                <ul className="space-y-4 p-4 border-t bg-gray-100">
                  {quizResults.map((result, index) => (
                    <li
                      key={index}
                      className="p-4 border rounded bg-white shadow-sm"
                    >
                      <div className="flex justify-between">
                        <span>Score: {result.score}</span>
                        <span>
                          Date: {new Date(result.created_at).toLocaleString()}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
