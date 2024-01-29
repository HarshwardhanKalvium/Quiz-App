import React, { useState, useEffect } from 'react';
import './QuestionBox.css';
import questions from '../questions';

const QuestionBox = ({ onQuestionsCompleted, onScoreUpdate }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const getCurrentQuestion = () => questions[currentQuestionIndex];

  const handleOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const renderOptions = () => {
    const currentQuestion = getCurrentQuestion();
    return currentQuestion.options.map((option) => (
      <div
        key={option.id}
        className="options"
        onClick={() => handleOptionClick(option.isCorrect)}
      >
        {option.text}
      </div>
    ));
  };

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      onQuestionsCompleted();
      onScoreUpdate(score);
    }
  }, [currentQuestionIndex, onQuestionsCompleted, onScoreUpdate, score]);

  const highlightButton = () =>{
    document.querySelector('h1').style.color = 'red';
  }
  const removeHighlightButton = () =>{
    document.querySelector('h1').style.color = 'rgb(0,0,139)'; 
  }



  return (
    <div>
      <div className='content'>
        <h2>Question: {currentQuestionIndex + 1} out of {questions.length}</h2>
        {currentQuestionIndex < questions.length && (
          <>
            <h1>{getCurrentQuestion().text}</h1>
            {renderOptions()}
          </>
        )}
        <div className='buttons'>
          <button onClick={highlightButton}>Highlight</button>
          <button onClick={removeHighlightButton}>Remove Highlight</button>
        </div>
        {/* <p>Score: {score}</p> */}
      </div>
    </div>
  );
};

export default QuestionBox;