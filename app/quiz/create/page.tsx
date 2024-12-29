"use client";

import Router from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoTrashOutline } from "react-icons/io5";
import { TiPlusOutline } from "react-icons/ti";

export default function CreateQuizPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", answers: [{ text: "", is_correct: false }] },
  ]);
  const router = Router.useRouter();

    useEffect(() => {
      const fetchUser = async () => {
        const response = await fetch("/api/auth/me");
        if (!response.ok) {
          toast.error("Please Login First !");
          router.push("/login");
        }
      };

      fetchUser();
    }, [router]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", answers: [{ text: "", is_correct: false }] },
    ]);
  };

  const handleAddAnswer = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.push({
      text: "",
      is_correct: false,
    });
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1); // Remove the question at the given index
    setQuestions(updatedQuestions);
  };

  const handleDeleteAnswer = (questionIndex: number, answerIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.splice(answerIndex, 1); // Remove the answer at the given index
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    const accessToken = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("access_token="))
      ?.split("=")[1];

    if (!accessToken) {
      alert("You must be logged in to create a quiz.");
      return;
    }

    const response = await fetch("/api/quiz/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, 
      },
      body: JSON.stringify({ title, description, questions }),
    });

    console.log(response);
    if (response.ok) {
      alert("Quiz created successfully!");
      setTitle("");
      setDescription("");
      setQuestions([{ text: "", answers: [{ text: "", is_correct: false }] }]);
    } else {
      alert("Failed to create quiz");
    }
  };

  return (
    <div className="p-6 font-medium">
      <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>
      <div className="mb-4 ">
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <textarea
          placeholder="Quiz Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <h2 className="text-xl font-bold my-2">Questions</h2>
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-4 p-4 border border-gray-200 rounded">
          <div className="flex flex-row justify-between items-center mb-4">
            <h3 className="font-semibold mb-2 text-lg">
              Question {qIndex + 1}
            </h3>
            <button
              onClick={() => handleDeleteQuestion(qIndex)}
              className="bg-red-500 text-white px-2 py-1 rounded ml-2 cursor-pointer"
            >
              <IoTrashOutline size={24} />
            </button>
          </div>

          <input
            type="text"
            placeholder={`Question ${qIndex + 1}`}
            value={question.text}
            onChange={(e) => {
              const updatedQuestions = [...questions];
              updatedQuestions[qIndex].text = e.target.value;
              setQuestions(updatedQuestions);
            }}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />

          <h3 className="font-normal mb-2 mt-4">Answers</h3>
          {question.answers.map((answer, aIndex) => (
            <div key={aIndex} className="flex space-x-5 items-center mb-2">
              <input
                type="text"
                placeholder={`Answer ${aIndex + 1}`}
                value={answer.text}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[qIndex].answers[aIndex].text =
                    e.target.value;
                  setQuestions(updatedQuestions);
                }}
                className="flex-1 p-2 border border-gray-300 rounded"
              />

              <label htmlFor={`checkbox-${qIndex}-${aIndex}`} className="ml-2">
                Correct?
              </label>
              <input
                type="checkbox"
                checked={answer.is_correct}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[qIndex].answers[aIndex].is_correct =
                    e.target.checked;
                  setQuestions(updatedQuestions);
                }}
                className="h-8 w-8 ml-2 cursor-pointer"
                id={`checkbox-${qIndex}-${aIndex}`}
              />

              <button onClick={() => handleDeleteAnswer(qIndex, aIndex)}>
                <IoTrashOutline
                  height={50}
                  className="text-red-700 text-3xl"
                ></IoTrashOutline>
              </button>
            </div>
          ))}
          <button
            onClick={() => handleAddAnswer(qIndex)}
            className="bg-indigo-600 text-white px-4 py-1 rounded mt-2"
          >
            <TiPlusOutline size={24} />
          </button>
        </div>
      ))}

      <div className="flex flex-row w-full justify-between items-center">
        <button
          onClick={handleAddQuestion}
          className="bg-indigo-600 text-white px-4 py-2 rounded mb-4"
        >
          Add Question
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
}
