import React, { useState } from 'react';
import './Settings.css';

// Icons
const AccountIcon = () => <span className="icon account-icon">👤</span>;
const PaymentIcon = () => <span className="icon payment-icon">💳</span>;
const ThemeIcon = () => <span className="icon theme-icon">🎨</span>;
const GeneralIcon = () => <span className="icon general-icon">⚙️</span>;
const ArrowIcon = () => <span className="arrow-icon">→</span>;
const ExpandIcon = () => <span className="expand-icon">▼</span>;
const CollapseIcon = () => <span className="expand-icon">▲</span>;

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [expandedSections, setExpandedSections] = useState({
    account: false,
    payment: false
  });
  
  // Sample user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "+1 (555) 123-4567",
    profilePic: "/api/placeholder/80/80" // Placeholder for profile pic
  };

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    document.body.className = newTheme;
  };
  
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  return (
    <div className="settings-container">
      <header className="settings-header">
        <h1>Settings</h1>
        <p>Manage your preferences and account settings</p>
      </header>
      
      {/* Account Information Section */}
      <div className="settings-section">
        <div 
          className="section-header clickable" 
          onClick={() => toggleSection('account')}
        >
          <AccountIcon />
          <h2>Account Information</h2>
          <div className="spacer"></div>
          {expandedSections.account ? <CollapseIcon /> : <ExpandIcon />}
        </div>
        
        {expandedSections.account && (
          <div className="section-content account-info">
            <div className="profile-container">
              <div className="profile-image">
                <img src={userData.profilePic} alt="Profile" />
                <div className="edit-overlay">Edit</div>
              </div>
              
              <div className="profile-details">
                <div className="profile-field">
                  <label>Name</label>
                  <div className="field-value">{userData.name}</div>
                </div>
                
                <div className="profile-field">
                  <label>Email</label>
                  <div className="field-value">{userData.email}</div>
                </div>
                
                <div className="profile-field">
                  <label>Mobile</label>
                  <div className="field-value">{userData.mobile}</div>
                </div>
                
                <button className="edit-profile-btn">Edit Profile</button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Payment Methods Section */}
      <div className="settings-section">
        <div 
          className="section-header clickable" 
          onClick={() => toggleSection('payment')}
        >
          <PaymentIcon />
          <h2>Payment Methods</h2>
          <div className="spacer"></div>
          <div className="current-selection">
            {paymentMethod === 'upi' ? 'UPI' : 'Net Banking'}
          </div>
          {expandedSections.payment ? <CollapseIcon /> : <ExpandIcon />}
        </div>
        
        {expandedSections.payment && (
          <div className="section-content">
            <p className="section-description">Choose your default payment method for booking buses</p>
            
            <div className="payment-options">
              <label className="payment-radio-option">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="upi" 
                  checked={paymentMethod === 'upi'} 
                  onChange={handlePaymentChange}
                />
                <div className="payment-radio-content">
                  <span className="option-icon">📱</span>
                  <div className="option-details">
                    <h3>UPI</h3>
                    <p>Pay instantly via UPI</p>
                  </div>
                </div>
              </label>
              
              <label className="payment-radio-option">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="net-banking" 
                  checked={paymentMethod === 'net-banking'} 
                  onChange={handlePaymentChange}
                />
                <div className="payment-radio-content">
                  <span className="option-icon">🏦</span>
                  <div className="option-details">
                    <h3>Net Banking</h3>
                    <p>Pay through your bank's net banking service</p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        )}
      </div>
      
      {/* Theme Section */}
      <div className="settings-section">
        <div className="section-header">
          <ThemeIcon />
          <h2>Theme</h2>
        </div>
        <div className="section-content">
          <p className="section-description">Choose how the app looks to you</p>
          
          <div className="theme-options">
            <label className="theme-radio-option">
              <input 
                type="radio" 
                name="theme" 
                value="light" 
                checked={theme === 'light'} 
                onChange={handleThemeChange}
              />
              <div className="theme-radio-content">
                <div className="theme-preview light"></div>
                <span className="theme-name">Light</span>
              </div>
            </label>
            
            <label className="theme-radio-option">
              <input 
                type="radio" 
                name="theme" 
                value="dark" 
                checked={theme === 'dark'} 
                onChange={handleThemeChange}
              />
              <div className="theme-radio-content">
                <div className="theme-preview dark"></div>
                <span className="theme-name">Dark</span>
              </div>
            </label>
          </div>
        </div>
      </div>
      
      {/* General Settings Section */}
      <div className="settings-section">
        <div className="section-header">
          <GeneralIcon />
          <h2>General Settings</h2>
        </div>
        <div className="section-content">
          <div className="setting-item">
            <div className="setting-info">
              <h3>Notifications</h3>
              <p>Manage push notifications and alerts</p>
            </div>
            <ArrowIcon />
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <h3>Language</h3>
              <p>Choose your preferred language</p>
            </div>
            <ArrowIcon />
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <h3>Privacy and Security</h3>
              <p>Manage your account security settings</p>
            </div>
            <ArrowIcon />
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <h3>Help & Support</h3>
              <p>Get help with using the app</p>
            </div>
            <ArrowIcon />
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <h3>About</h3>
              <p>Learn more about the app</p>
            </div>
            <ArrowIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;