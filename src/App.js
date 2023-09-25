import React, { useState } from 'react';
import questions from './data/questions.json';
import './App.css';

export default function App() {
  const initialSelectedAnswers = questions.map(() => null);
  const [selectedAnswers, setSelectedAnswers] = useState(initialSelectedAnswers);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const getOptionClass = (q, option) => {
    let c = 'list-group-item';
    if (showCorrectAnswer) {
      if (q.answer === option) c = c + ' bg-success';
      else if (selectedAnswers[currentQuestionIndex] === option) c = c + ' bg-danger';
    }
    return c;
  };

  const onOptionClick = (option) => {
    if (showCorrectAnswer || submitted) return;
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(newSelectedAnswers);
    setShowCorrectAnswer(true);
  };

  const handleNextQuestion = () => {
    setShowCorrectAnswer(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleCompleteQuiz = () => {
    setSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (q.answer === selectedAnswers[index]) {
        score++;
      }
    });
    return score;
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container my-5">
      <h1>React Js Quiz App</h1>
      <br />
      {currentQuestion && (
        <div key={currentQuestion.id}>
          <h5>{currentQuestion.statement}</h5>
          <ul className="list-group">
            {currentQuestion.options.map((option) => (
              <li
                key={option}
                className={getOptionClass(currentQuestion, option)}
                onClick={() => onOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-4">
        {currentQuestionIndex < questions.length - 1 && (
          <button className="btn" onClick={handleNextQuestion}>
            Next
          </button>
        )}
        {currentQuestionIndex === questions.length - 1 && !submitted && (
          <button className="btn" onClick={handleCompleteQuiz}>
            Complete
          </button>
        )}
      </div>
      <div>
        {submitted && (
          <div>
            <p>Your score: {calculateScore()} out of {questions.length}</p>
            <p>Answers:</p>
            <ul>
              {questions.map((q, index) => (
                <li key={q.id}>
                  {q.statement}
                  <br />
                  Correct Answer: {q.answer}
                  <br />
                  Your Answer: {selectedAnswers[index]}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
