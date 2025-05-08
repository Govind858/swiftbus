import React, { useState } from 'react';
import './PreviousTickets.css';

const PreviousTickets = () => {
  // Sample ticket data (would come from API in real application)
  const [tickets] = useState([
    {
      id: 'BUS-2024-001',
      from: 'New York',
      to: 'Boston',
      date: '2024-02-15',
      time: '14:30',
      status: 'Completed',
      passengers: 2,
      price: 45.99
    },
    {
      id: 'BUS-2024-002',
      from: 'Chicago',
      to: 'Detroit',
      date: '2024-03-01',
      time: '10:15',
      status: 'Completed',
      passengers: 1,
      price: 35.50
    },
    {
      id: 'BUS-2024-003',
      from: 'San Francisco',
      to: 'Los Angeles',
      date: '2024-03-10',
      time: '16:45',
      status: 'Upcoming',
      passengers: 3,
      price: 55.25
    }
  ]);

  return (
    <div className="tickets-container">
      <div className="tickets-header">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
        <h1>My Previous Tickets</h1>
      </div>

      {tickets.length === 0 ? (
        <div className="no-tickets">
          <p>No previous tickets found</p>
        </div>
      ) : (
        <div className="tickets-list">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-item">
              <div className="ticket-details">
                <div className="ticket-route">
                  {ticket.from} → {ticket.to}
                </div>
                <div className="ticket-info">
                  <span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {ticket.date}
                  </span>
                  <span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {ticket.time}
                  </span>
                </div>
                <div className="ticket-meta">
                  <span 
                    className={`ticket-status ${
                      ticket.status === 'Completed' 
                        ? 'status-completed' 
                        : 'status-upcoming'
                    }`}
                  >
                    {ticket.status}
                  </span>
                  <span className="ticket-passengers">
                    {ticket.passengers} Passenger{ticket.passengers > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              <div className="ticket-pricing">
                <span className="ticket-price">${ticket.price.toFixed(2)}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="ticket-arrow"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousTickets;