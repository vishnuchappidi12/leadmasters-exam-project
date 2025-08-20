import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Exam from './components/exam/Exam';
import Result from './components/exam/Result';
import PrivateRoute from './components/routing/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/exam" element={<PrivateRoute><Exam /></PrivateRoute>} />
            <Route path="/result" element={<PrivateRoute><Result /></PrivateRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;