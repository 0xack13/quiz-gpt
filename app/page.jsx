"use client";

import React, { useState } from "react";
import QuizComponent from "../components/QuizComponent";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [gptResponse, setGptResponse] = useState(undefined);
  const [gptResponseParsed, setGptResponseParsed] = useState(undefined);
  const [showAnswers, setShowAnswers] = useState(false);
  const [resetSelection, setResetSelection] = useState(true);

  const queryGPT = () => {
    setLoading(true);
    const ethusdURL = "/api/generateQuiz";
    fetch(ethusdURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    })
      .then((response) => response.json())
      .then((data) => {
        setGptResponse(data.msg);
        let parsedQuiz = JSON.parse(data.msg);
        setGptResponseParsed(parsedQuiz);
        setLoading(false);
      })
      .catch((error) => {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    queryGPT();
    setShowAnswers(false);
  };

  return (
    <div>
      <div className="text-[24px] lg:text-[36px] text-center text-white font-extrabold lg:my-4;">
        QUIZ GPT
      </div>
      <div className="flex items-center justify-center mt-5">
        <form onSubmit={handleSubmit} className="space-y-6 w-[70%] h-[20%]">
          <input
            className="text-black w-full p-3 h-[20%]"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a topic to generate a quiz "
          />
          <button
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            Generate Quiz
          </button>
        </form>
      </div>
      <div className="w-full text-center text-yellow-200 m-3">
        {loading ? (
          <>Loading... Can take up to 30s to generate quiz.</>
        ) : (
          <div></div>
        )}
      </div>
      <div className="m-6">
        {" "}
        {gptResponseParsed ? (
          <QuizComponent questions={gptResponseParsed.quiz.questions} />
        ) : null}
      </div>
    </div>
  );
};

export default Home;
