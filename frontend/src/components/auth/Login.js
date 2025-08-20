import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
