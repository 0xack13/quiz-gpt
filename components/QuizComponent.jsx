import React, { useState, useEffect } from "react";

const QuizComponent = ({ questions }) => {
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);

  // setShowAnswers(hideAnswers);

  const handleChoiceClick = (questionIndex, choiceIndex) => {
    const newSelectedChoices = [...selectedChoices];
    newSelectedChoices[questionIndex] = choiceIndex;
    setSelectedChoices(newSelectedChoices);
  };

  const checkAnswers = () => {
    setShowAnswers(true);
  };

  const renderChoices = (options, questionIndex, correctAnswer) => {
    return options.map((option, optionIndex) => {
      const isChoiceSelected = selectedChoices[questionIndex] === optionIndex;
      const isCorrectAnswer = option === correctAnswer;
      let choiceClassName = "choice p-4 border border-gray-300";

      if (showAnswers) {
        if (isCorrectAnswer) {
          choiceClassName += " border-green-500 border-4";
        }
      }
      if (isChoiceSelected) {
        choiceClassName += " bg-blue-400";
      }

      return (
        <div
          key={optionIndex}
          className={choiceClassName}
          onClick={() => handleChoiceClick(questionIndex, optionIndex)}
        >
          {option}
        </div>
      );
    });
  };

  useEffect(() => {
    const resetState = () => {
      setSelectedChoices([]);
      setShowAnswers(false);
    };

    resetState();
  }, [questions]);

  return (
    <div>
      <div className="flex flex-wrap -mx-4">
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="w-full sm:w-1/2 px-4 mb-8">
            <h3 className="text-lg font-semibold mb-2">{question.question}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderChoices(question.options, questionIndex, question.answer)}
            </div>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-4"
        onClick={checkAnswers}
      >
        Show Answers
      </button>
    </div>
  );
};

export default QuizComponent;
