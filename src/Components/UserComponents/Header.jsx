import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LuTicket } from "react-icons/lu";
import { AiOutlineUser } from "react-icons/ai";
import AccountCard from '../AccountCard';
import './Header.css';

const Header = () => {
  const [showCard, setShowCard] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const cardRef = useRef(null);
  const location = useLocation();

  const handleCard = () => {
    setShowCard(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowCard(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setShowCard(false);
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="header-container">
        <Link to='/user/userHome' className="logo-link">
          <h1 className="bus-logo">
            Swift<span className="logo-highlight">Bus</span>
          </h1>
        </Link>

        <nav className="nav-container">
          <Link 
            to="/user/history" 
            className={`nav-link ${location.pathname.includes('history') ? 'active' : ''}`}
            aria-label={isMobile ? "Tickets" : "My Tickets"}
          >
            <LuTicket className="nav-icon" />
            {!isMobile && <span>My Tickets</span>}
          </Link>

          {/* ✅ Live Map Button */}
          <Link 
            to="/user/map" 
            className={`nav-link ${location.pathname.includes('live-map') ? 'active' : ''}`}
            aria-label={isMobile ? "Map" : "Live Map"}
          >
            <span className="nav-icon map-pin-icon"></span>
            {!isMobile && <span>Live Map</span>}
          </Link>

          <button 
            onClick={handleCard}
            className={`account-btn ${showCard ? 'active' : ''}`}
            aria-expanded={showCard}
            aria-label={isMobile ? "Account" : "Account menu"}
          >
            <AiOutlineUser className="nav-icon" />
            {!isMobile && <span>Account</span>}
          </button>

          {showCard && (
            <div ref={cardRef} className="account-card-container">
              <AccountCard onClose={() => setShowCard(false)} />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
