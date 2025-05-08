// BusOperatorLogin.jsx
import React, { useState } from 'react';
import "./BusOperatorLogin.css"; 
import { useNavigate } from 'react-router-dom';
import { busSignin } from '../../Api/DriverApi';
import { useAuth } from '../../ContextTesting/Components/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { loginBusOperator } = useAuth(); // ✅ use the correct login function
  
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
      const response = await busSignin(formData);
      
      if (response && response.success) {
        const token = response.result.token;
        const userData = response.result;
        
        localStorage.setItem('bus-operator-token', token);

        loginBusOperator(userData); // ✅ Call bus-operator-specific login
        console.log("Login successful, context updated with:", userData);
        setError("success");
        
        setTimeout(() => {
          navigate('/bus-operator/home');
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
              id="email"
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
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-input"
              required
            />
          </div>
          
          {error && <p className={`error-message ${error === "success" ? "success" : ""}`}>
            {error === "success" ? "Login successful!" : error}
          </p>}
          
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
