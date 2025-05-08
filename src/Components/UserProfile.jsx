import React, { useState } from 'react';
import './UserProfile.css';

const SimpleProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const profileData = {
    name: 'Emma Rodriguez',
    profession: 'Software Engineer',
    email: 'emma.rodriguez@gmail.com',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Passionate developer with a love for creating innovative solutions and exploring new technologies.',
    skills: ['React', 'Node.js', 'Python', 'Docker', 'AWS'],
    contact: {
      phone: '+1 (650) 555-1234',
      location: 'San Francisco, CA'
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/emmarodriguez',
      github: 'https://github.com/emmarodriguez'
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="profile-overview">
            <div className="skills-section">
              <h3>Skills</h3>
              <div className="skills-list">
                {profileData.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="bio-section">
              <h3>About Me</h3>
              <p>{profileData.bio}</p>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="profile-contact">
            <div className="contact-info">
              <div className="contact-item">
                <span>Email</span>
                <p>{profileData.email}</p>
              </div>
              <div className="contact-item">
                <span>Phone</span>
                <p>{profileData.contact.phone}</p>
              </div>
              <div className="contact-item">
                <span>Location</span>
                <p>{profileData.contact.location}</p>
              </div>
            </div>
            <div className="social-links">
              <a 
                href={profileData.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                LinkedIn
              </a>
              <a 
                href={profileData.socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                GitHub
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="simple-profile-container">
      <div className="profile-header">
        <div className="avatar-container">
          <img 
            src={profileData.avatar} 
            alt={profileData.name} 
            className="profile-avatar" 
          />
        </div>
        <div className="profile-basic-info">
          <h1>{profileData.name}</h1>
          <p>{profileData.profession}</p>
        </div>
        <div className="profile-navigation">
          <button 
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={activeTab === 'contact' ? 'active' : ''}
            onClick={() => setActiveTab('contact')}
          >
            Contact
          </button>
        </div>
      </div>
      <div className="profile-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default SimpleProfile;