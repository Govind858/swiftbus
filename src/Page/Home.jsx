import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './BusTicketHomeScreen.css'; // Import the CSS file

const BusTicketHomeScreen = () => {
  const [currentQuote, setCurrentQuote] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('');
  const navigate = useNavigate(); // Add this line to initialize useNavigate

  // Array of travel-related quotes
  const quotes = [
    { text: "The world is a book, and those who do not travel read only one page.", author: "St. Augustine" },
    { text: "Travel is the only thing you buy that makes you richer.", author: "Anonymous" },
    { text: "Life is a journey, not a destination.", author: "Ralph Waldo Emerson" },
    { text: "Traveling – it leaves you speechless, then turns you into a storyteller.", author: "Ibn Battuta" }
  ];

  // Rotate quotes every 5 seconds
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setCurrentQuote(randomQuote.text);
      setQuoteAuthor(randomQuote.author);
    }, 5000);

    // Initialize with a random quote
    const initialQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(initialQuote.text);
    setQuoteAuthor(initialQuote.author);

    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <div className="bus-ticket-home-screen">
      {/* Background Pattern */}
      <div className="background-pattern"></div>
      
      {/* Logo/Title */}
      <div className="logo-container animate-fade-in">
        <h1 className="app-title">
          Swift<span className="highlight">Bus</span>
        </h1>
        <p className="app-subtitle">Your Journey, Your Comfort</p>
      </div>

      {/* Animated Quote Section */}
      <div className="quote-container animate-bounce-in">
        <blockquote className="quote">
          "{currentQuote}"
        </blockquote>
        <p className="quote-author">- {quoteAuthor}</p>
      </div>

      {/* Get Started Button - Changed from Link to button with navigate */}
      <button 
        className="get-started-btn"
        onClick={() => navigate('/user/login')}
      >
        Get Started <ArrowRight className="btn-icon" />
      </button>
    </div>
  );
};

export default BusTicketHomeScreen;