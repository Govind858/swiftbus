import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Ticket, User, Menu, X } from 'lucide-react';
import './NavBar.css';
import ProfileCard from './UserComponents/ProfileCard';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [showCard, setShowCard] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (navId) => {
    setActiveNav(navId);
    setIsMenuOpen(false);

    if (navId === 'profile') {
      setShowCard(true);
    } else {
      setShowCard(false);
    }
  };

  return (
    <div className="navbar-wrapper">
      <nav className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <h1 className="app-title">
            Swift<span className="highlight">Bus</span>
          </h1>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </div>

        {/* Navigation Menu */}
        <div className={`navbar-menu ${isMenuOpen ? 'menu-open' : ''}`}>
          <div className="navbar-links">
            {/* Home Link */}
            <Link
              to="/user/userHome"
              className={`nav-item ${activeNav === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              <Home />
              <span>Home</span>
            </Link>

            {/* My Tickets Link */}
            <Link
              to="/user/history"
              className={`nav-item ${activeNav === 'history' ? 'active' : ''}`}
              onClick={() => handleNavClick('history')}
            >
              <Ticket />
              <span>My Tickets</span>
            </Link>

            {/* Profile Button */}
            <div
              className={`nav-item ${activeNav === 'profile' ? 'active' : ''}`}
              onClick={() => handleNavClick('profile')}
              style={{ cursor: 'pointer' }}
            >
              <User />
              <span>Profile</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Card */}
      <ProfileCard visible={showCard} />
    </div>
  );
};

export default NavBar;
