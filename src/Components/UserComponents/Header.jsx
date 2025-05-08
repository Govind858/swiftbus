import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import { LuTicket } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { AiOutlineUser } from "react-icons/ai";
import AccountCard from '../AccountCard';

const Header = () => {
  const [showCard, setShowCard] = useState(false);
  const cardRef = useRef(null);

  const handleCard = () => {
    setShowCard(prev => !prev);
  };

  // Hide overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowCard(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="user-logo">
        <Link to='/user/userHome'>Swift<span className="highlight">Bus</span></Link>
      </div>

      <div className="button-group">
        <Link to="/user/history" className="my-ticket">
          <LuTicket className='ticket-icon' /> My Tickets
        </Link>

        {/* Use button instead of <a href="#"> */}
        <button onClick={handleCard} className="account-btn">
          <AiOutlineUser className='account-icon' /> Account
        </button>

        {/* AccountCard as dropdown overlay */}
        {showCard && (
          <div ref={cardRef} className="account-card-overlay">
            <AccountCard />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
