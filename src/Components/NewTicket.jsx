import React, { useEffect, useState } from 'react';
import BusOperatorAxios from "../Axios/BusOperatorAxios";
import { MdTrendingFlat, MdLocationOn, MdAccessTime, MdAttachMoney, MdDirectionsBus } from "react-icons/md";
import './NewTicket.css'; // Create a separate CSS file for this component
import qrCode  from '../assets/qr-code.png'

const NewTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const response = await BusOperatorAxios.get('/bus-operator/viewBookings');
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
      <div className="new-ticket-loading">
        <div className="new-loading-spinner"></div>
        <p>Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="new-ticket-error">
        <p>{error}</p>
        <button className="new-retry-button" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="new-ticket-container">
      <div className="new-ticket-page-container">
        <h2 className="new-ticket-page-title">Booking Details</h2>
        
        {tickets.length > 0 ? (
          <div className="new-ticket-list">
            {tickets.map((ticket, index) => (
              <div key={index} className="new-ticket-card">
                <div className="new-ticket-header">
                  <div className="new-bus-info">
                    <MdDirectionsBus className="new-bus-icon" />
                    <h3 className="new-bus-name">{ticket.busName}</h3>
                  </div>
                  <div className="new-ticket-badge">
                    <span>Booking</span>
                  </div>
                </div>

                <div className="new-ticket-route">
                  <div className="new-location new-from-location">
                    <div className="new-location-dot new-from-dot"></div>
                    <div className="new-location-details">
                      <div className="new-location-icon-label">
                        <MdLocationOn className="new-location-icon" />
                        <p className="new-location-label">From</p>
                      </div>
                      <p className="new-stop-name">{ticket.fromStop.stop}</p>
                      <div className="new-time-container">
                        <MdAccessTime className="new-time-icon" />
                        <p className="new-time">{ticket.fromStop.time}</p>
                      </div>
                    </div>
                  </div>

                  <div className="new-route-line">
                    <MdTrendingFlat className="new-route-arrow" />
                  </div>

                  <div className="new-location new-to-location">
                    <div className="new-location-dot new-to-dot"></div>
                    <div className="new-location-details">
                      <div className="new-location-icon-label">
                        <MdLocationOn className="new-location-icon" />
                        <p className="new-location-label">To</p>
                      </div>
                      <p className="new-stop-name">{ticket.toStop.stop}</p>
                      <div className="new-time-container">
                        <MdAccessTime className="new-time-icon" />
                        <p className="new-time">{ticket.toStop.time}</p>
                      </div>
                    </div>
                  </div>
                    <div>
                        <img id='qr-img' src={qrCode} alt="" />
                    </div>
                </div>

                <div className="new-ticket-footer">
                  <div className="new-ticket-fare">
                    <MdAttachMoney className="new-fare-icon" />
                    <p className="new-fare-amount">₹{ticket.fare}</p>
                  </div>
                  <div>
                    <p>{new Date(ticket.updatedAt).toLocaleString()}</p>
                  </div>
                  <div className="new-ticket-distance">
                    <p>{ticket.distance} km</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="new-no-tickets">
            <div className="new-no-tickets-icon">🎫</div>
            <h3>No bookings found</h3>
            <p>Booking details will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewTicket;