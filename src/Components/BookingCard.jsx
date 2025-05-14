import React, { useState } from 'react';
import { Plus, Minus, CalendarDays, MapPin, Bus, X } from 'lucide-react';
import './BookingCard.css';
import UserAxios from '../Axios/UserAxios';

function BookingCard({ bus, date, onCancel }) {
  const [passengers, setPassengers] = useState(1);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const farePerPerson = bus.fare;

  const decreasePassengers = () => {
    if (passengers > 1) {
      setPassengers(passengers - 1);
    }
  };

  const increasePassengers = () => {
    setPassengers(passengers + 1);
  };

  const paymentFunction = async () => {
    setIsProcessing(true);
    try {
      // Including passenger count in the request
      const bookingData = {
        ...bus,
        passengerCount: passengers,
        totalFare: farePerPerson * passengers
      };
      
      const response = await UserAxios.post('/trips/ticket', bookingData);
      setMessage("Payment successful!");
      console.log("bookingData:",bookingData)
      // You could add a setTimeout here to close the modal after success
    } catch (error) {
      console.error(error);
      setMessage("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Format date for display
  const displayDate = date || "Today";

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal-content">
        {/* Header - Sticky at the top */}
        <div className="booking-header">
          <button className="close-button" onClick={onCancel}>
            <X size={20} />
          </button>
        </div>
        
        {/* Scrollable Body */}
        <div className="booking-body">
          {/* Bus Info */}
          <div className="bus-details">
            <div className="bus-icon-container">
              <Bus size={28} className="bus-icon" />
            </div>
            <span className="bus-name">{bus.busName}</span>
          </div>
          
          {/* Journey Information */}
          <div className="journey-info">
            {/* Departure */}
            <div className="stop-details">
              <div className="stop-icon-container">
                <MapPin size={18} className="stop-icon" />
              </div>
              <div className="stop-content">
                <div className="stop-name">{bus.fromStop.stop}</div>
                <div className="stop-time">{bus.fromStop.time}</div>
              </div>
            </div>
            
            {/* Route visualization */}
            <div className="journey-route">
              <div className="route-line"></div>
            </div>
            
            {/* Arrival */}
            <div className="stop-details">
              <div className="stop-icon-container">
                <MapPin size={18} className="stop-icon" />
              </div>
              <div className="stop-content">
                <div className="stop-name">{bus.toStop.stop}</div>
                <div className="stop-time">{bus.toStop.time}</div>
              </div>
            </div>
          </div>
          
          {/* Date Information */}
          <div className="date-info">
            <CalendarDays size={18} className="date-icon" />
            <span className="date-text">{displayDate}</span>
          </div>
          
          {/* Passenger Selection */}
          <div className="passenger-section">
            <div className="passenger-counter">
              <span className="counter-label">Passengers</span>
              <div className="counter-controls">
                <button 
                  onClick={decreasePassengers} 
                  className="counter-button"
                  disabled={passengers <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="passenger-count">{passengers}</span>
                <button 
                  onClick={increasePassengers} 
                  className="counter-button"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <div className="fare-info">
              <span className="fare-label">Fare per person</span>
              <span className="fare-amount">₹{farePerPerson}</span>
            </div>
          </div>
          
          {/* Total Section */}
          <div className="total-section">
            <span className="total-label">Total Amount</span>
            <span className="total-amount">₹{farePerPerson * passengers}</span>
          </div>
          
          {/* Status Message */}
          {message && <div className="status-message">{message}</div>}
        </div>
        
        {/* Footer with Pay Button - Sticky at the bottom */}
        <div className="booking-footer">
          <button 
            className="pay-button" 
            onClick={paymentFunction}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;