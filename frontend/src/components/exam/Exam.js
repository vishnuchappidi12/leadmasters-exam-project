import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Exam = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); 
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleSubmit = useCallback(async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/exam/submit', { answers });
      navigate('/result', {
        state: { score: res.data.score, total: res.data.total }
      });
    } catch (err) {
      console.error('Error submitting exam:', err);
    }
  }, [answers, navigate]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/exam/questions');
        setQuestions(res.data);
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, handleSubmit]);

  const handleAnswerSelect = (option) => {
    const questionId = questions[currentQuestionIndex]._id;
    setAnswers({ ...answers, [questionId]: option });
  };
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (questions.length === 0) return <div>Loading questions...</div>;

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion._id];

  return (
    <div className="exam-container">
      <div className="exam-header">
        <h2>React Quiz</h2>
        <div className="timer">Time Left: {formatTime(timeLeft)}</div>
      </div>
      <div className="question-container">
        <h3>{currentQuestionIndex + 1}. {currentQuestion.questionText}</h3>
        <ul className="options-list">
          {currentQuestion.options.map((option, index) => (
            <li key={index} onClick={() => handleAnswerSelect(option)} className={selectedAnswer === option ? 'selected' : ''}>
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div className="navigation-buttons">
        <button className="btn" onClick={() => setCurrentQuestionIndex(p => p - 1)} disabled={currentQuestionIndex === 0}>Previous</button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button className="btn btn-submit" onClick={handleSubmit}>Submit</button>
        ) : (
          <button className="btn" onClick={() => setCurrentQuestionIndex(p => p + 1)}>Next</button>
        )}
      </div>
       <button onClick={logout} className="btn btn-logout">Logout</button>
    </div>
  );
};

export default Exam;
