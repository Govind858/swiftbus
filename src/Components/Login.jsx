import React, { useState } from 'react';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import { loginUser as loginUserApi } from '../Api/UserApi'; // ✅ renamed to avoid conflict
import { useAuth } from '../ContextTesting/Components/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth(); // ✅ context method for users

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginUserApi(formData); // ✅ call actual API

      if (response && response.success) {
        const token = response.result.token;
        const userData = response.result;

        localStorage.setItem('jwt-token', token); // ✅ store user token
        loginUser(userData); // ✅ update context

        console.log("User login successful:", userData);
        setError("success");

        setTimeout(() => {
          navigate('/user/userHome');
        }, 100);
      } else {
        setError(response?.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-input"
              required
            />
          </div>

          {error && (
            <p className={`error-message ${error === "success" ? "success" : ""}`}>
              {error === "success" ? "Login successful!" : error}
            </p>
          )}

          <div className="form-footer">
            <div className="remember-forgot">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="/forgot-password" className="forgot-link">Forgot password?</a>
            </div>
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
