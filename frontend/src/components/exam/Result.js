import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const { score, total } = location.state || { score: 'N/A', total: 'N/A' };

  return (
    <div className="result-container">
      <h2>Exam Result</h2>
      <p className="score">You scored {score} out of {total}</p>
      <Link to="/exam" className="btn">Try Again</Link>
    </div>
  );
};

export default Result;
