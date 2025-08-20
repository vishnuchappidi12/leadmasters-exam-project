import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
      setIsAuthenticated(true);
      navigate('/exam');
    } catch (err) {
      console.error('Login failed:', err.response ? err.response.data.msg : err.message);
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
      setIsAuthenticated(true);
      navigate('/exam');
    } catch (err) {
      console.error('Registration failed:', err.response ? err.response.data.msg : err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
