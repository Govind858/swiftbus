import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { busSignup } from '../../Api/DriverApi';
import './BusSignupForm.css';

const BusSignupForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear previous errors when user starts typing again
    setFormError('');
  };

  const validateForm = () => {
    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return false;
    }

    // Mobile validation (basic)
    if (formData.mobile.length < 10) {
      setFormError('Please enter a valid mobile number');
      return false;
    }

    // Password validation (at least 6 characters)
    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous states
    setFormError('');
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const response = await busSignup(formData);
      
      if (response && response.success) {
        // Show success popup instead of redirecting immediately
        setShowSuccessPopup(true);
      } else {
        // Handle API error responses
        setFormError(response?.message || 'Failed to create account. Please try again.');
      }
    } catch (error) {
      setFormError('An error occurred. Please try again later.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    navigate('/bus-operator/home');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-container">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="success-popup">
            <button className="close-popup" onClick={handleClosePopup}>
              <X size={20} />
            </button>
            <div className="popup-icon">
              <CheckCircle size={50} />
            </div>
            <h3>Success!</h3>
            <p>Your account has been created successfully.</p>
            <button className="popup-button" onClick={handleClosePopup}>
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}

      <div className="signup-form-wrapper">
        <h1 className="app-title">SwiftBus</h1>
        <h2 className="form-title">Create an Account</h2>
        
        {/* Error Message */}
        {formError && (
          <div className="form-error">
            <AlertCircle size={18} />
            <span>{formError}</span>
          </div>
        )}
        
        <div className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-group">
              <User size={18} className="input-icon" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-group">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <div className="input-group">
              <Phone size={18} className="input-icon" />
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div 
                className="password-toggle" 
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
            <p className="password-hint">Password must be at least 6 characters</p>
          </div>
          
          <button 
            className={`signup-button ${loading ? 'loading' : ''}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader size={18} className="spinner" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </div>
        
        <p className="signin-link">
          Already have an account? <a href="/bus-operator/login">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default BusSignupForm;