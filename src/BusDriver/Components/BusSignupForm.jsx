import { useState } from 'react';
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';
import './BusSignupForm.css';
import { busSignup } from '../../Api/DriverApi';
import { useNavigate } from 'react-router-dom';

export default function BusSignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form submission logic would go here
    const response = await busSignup(formData)
    console.log(response)
    if(response && response.success){
      navigate('/driverHome')
    }
   

  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2 className="app-name">SwiftBus</h2>
          <p className="subtitle">Create your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <div className="input-icon">
              <User size={18} />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>
          
          <div className="input-group">
            <div className="input-icon">
              <Mail size={18} />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
          </div>
          
          <div className="input-group">
            <div className="input-icon">
              <Phone size={18} />
            </div>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
            />
          </div>
          
          <div className="input-group">
            <div className="input-icon">
              <Lock size={18} />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          
          <button type="submit" className="signup-button">
            Sign Up <ArrowRight size={18} />
          </button>
        </form>
        
        <div className="signin-link">
          Already have an account? <a href="#">Sign in</a>
        </div>
      </div>
    </div>
  );
}