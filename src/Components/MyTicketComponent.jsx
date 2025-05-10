import React, { useEffect, useState } from 'react';
import UserAxios from '../Axios/UserAxios';
import { MdTrendingFlat, MdLocationOn, MdAccessTime, MdAttachMoney, MdDirectionsBus } from "react-icons/md";
import './MyTicketComponent.css';

// Make sure to install react-icons: npm install react-icons

const MyTicketComponent = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const response = await UserAxios.get('/user/viewTicket');
        setTickets(response.data.tickets);
        setError(null);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError("Failed to load tickets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="ticket-loading">
        <div className="loading-spinner"></div>
        <p>Loading your tickets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ticket-error">
        <p>{error}</p>
        <button className="retry-button" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="my-ticket-container">
      <div className="ticket-page-container">
        <h2 className="ticket-page-title">My Tickets</h2>
        
        {tickets.length > 0 ? (
          <div className="ticket-list">
            {tickets.map((ticket, index) => (
              <div key={index} className="ticket-card">
                <div className="ticket-header">
                  <div className="bus-info">
                    <MdDirectionsBus className="bus-icon" />
                    <h3 className="bus-name">{ticket.busName}</h3>
                  </div>
                  <div className="ticket-badge">
                    <span>E-Ticket</span>
                  </div>
                </div>

                <div className="ticket-route">
                  <div className="location from-location">
                    <div className="location-dot from-dot"></div>
                    <div className="location-details">
                      <div className="location-icon-label">
                        <MdLocationOn className="location-icon" />
                        <p className="location-label">From</p>
                      </div>
                      <p className="stop-name">{ticket.fromStop.stop}</p>
                      <div className="time-container">
                        <MdAccessTime className="time-icon" />
                        <p className="time">{ticket.fromStop.time}</p>
                      </div>
                    </div>
                  </div>

                  <div className="route-line">
                    <MdTrendingFlat className="route-arrow" />
                  </div>

                  <div className="location to-location">
                    <div className="location-dot to-dot"></div>
                    <div className="location-details">
                      <div className="location-icon-label">
                        <MdLocationOn className="location-icon" />
                        <p className="location-label">To</p>
                      </div>
                      <p className="stop-name">{ticket.toStop.stop}</p>
                      <div className="time-container">
                        <MdAccessTime className="time-icon" />
                        <p className="time">{ticket.toStop.time}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ticket-footer">
                  <div className="ticket-fare">
                    <MdAttachMoney className="fare-icon" />
                    <p className="fare-amount">₹{ticket.fare}</p>
                  </div>
                  <div className="ticket-distance">
                    <p>{ticket.distance} km</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-tickets">
            <div className="no-tickets-icon">🎫</div>
            <h3>No tickets found</h3>
            <p>Your booked tickets will appear here</p>
            <button className="book-ticket-button">Book a Ticket</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTicketComponent;