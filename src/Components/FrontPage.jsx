import React from 'react';
import { useNavigate } from 'react-router-dom';

const FrontPage = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleGetStartedClick = () => {
    navigate('/user/userHome');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.appName}>SwiftBus</h1>
      </header>
      <main style={styles.mainContent}>
        <h2 style={styles.tagline}>
          Connecting you to your destination.
        </h2>
        <button style={styles.getStartedButton} onClick={handleGetStartedClick}>
          Get Started
        </button>
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: 'white',
    padding: '20px',
    textAlign: 'center',
    position: 'relative',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '40px',
  },
  appName: {
    fontSize: '3em',
    color: '#FFD700',
    fontWeight: 'bold',
    letterSpacing: '2px',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tagline: {
    fontSize: '2.2em',
    color: '#FFD700',
    marginBottom: '50px',
    fontWeight: '500',
    lineHeight: '1.4',
    maxWidth: '80%',
    textAlign: 'center',
  },
  getStartedButton: {
    backgroundColor: '#FFD700',
    color: '#000',
    padding: '15px 35px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.4em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    fontWeight: 'bold',
  },
  getStartedButtonHover: {
    backgroundColor: '#FFC300',
    transform: 'scale(1.04)',
  },
};

export default FrontPage;
