import React from 'react';
import "../BusDriver/Components/ProfileDropdown.css"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../ContextTesting/Components/AuthContext';

const AccountCard = () => {
  const navigate = useNavigate();
  const { authData, logout, isUser } = useAuth();

  // Default values
  let avatarText = "??";
  let userName = "Not Logged In";
  let extraInfo = "Please login first";

  // ✅ Extract user data if logged in
  if (authData?.data) {
    const { name } = authData.data;
    userName = name || "Unnamed";
    avatarText = name ? name.substring(0, 2).toUpperCase() : "??";
    extraInfo = isUser ? "User Account" : "Unknown Role";
  }

  // ✅ Logout: remove user token and redirect
  const handleLogout = () => {
    console.log('User logging out...');
    localStorage.removeItem('user-token'); // ✅ Remove user token
    logout(); // ✅ Clear auth context
    navigate('/user/login'); // ✅ Redirect to user login
  };

  return (
    <div className="profile-dropdown">
      <div className="profile-header">
        <div className="avatar">{avatarText}</div>
        <div className="profile-info">
          <div className="profile-name">{userName}</div>
          <div className="profile-bus">{extraInfo}</div>
        </div>
      </div>

      <div className="profile-footer">
        <button onClick={handleLogout} className="logout-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountCard;
