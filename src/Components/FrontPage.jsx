import React from 'react';
import { useNavigate } from 'react-router-dom';
import bus from '../assets/Adobe-bus.png';
import './FrontPage.css';

const FrontPage = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/user/userHome');
  };

  return (
    <div className="split-container">
      {/* Left half - Brand and call to action */}
      <div className="left-half">
        <div className="brand-content">
          <h1 className="brand-name">SwiftBus</h1>
          <p className="brand-tagline">Connecting Your Destinations</p>
          <button 
            className="get-started-button" 
            onClick={handleGetStartedClick}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Right half - Image */}
      <div className="right-half">
        
        <img 
          src={bus} 
          alt="SwiftBus Transportation" 
          className="hero-image"
        />
      </div>
      <div>
     
      </div>
    </div>
  );
};

export default FrontPage;