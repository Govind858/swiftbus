// BookingCard.jsx
import React, { useState } from 'react';
import { Plus, Minus, CalendarDays, MapPin, Bus } from 'lucide-react';
import './BookingCard.css'; // Create this file for your custom styles
import { TbReceiptYuan } from 'react-icons/tb';
import UserAxios from '../Axios/UserAxios';
function BookingCard({ bus, date, onPayNow, onCancel }) {
  const [passengers, setPassengers] = useState(1);
  const [message,setmessage] = useState()
  const farePerPerson = bus.fare; // You can pass this as a prop if it varies

  console.log("pros recevied in booking card:",bus)

  const decreasePassengers = () => {
    if (passengers > 1) {
      setPassengers(passengers - 1);
    }
  };

  const increasePassengers = () => {
    setPassengers(passengers + 1);
  };

  const handlePayNow = () => {
    onPayNow(passengers, farePerPerson * passengers);
  };

  const paymentFunction = async () => {
     setmessage("payment successfull") 
     try {
      const response = await UserAxios.post('/trips/ticket',bus)
     } catch (error) {
      console.log(error)
     }
  }

  

  return (
   <div className="booking-card-container">
     <div className="booking-card">
      <div className="card-header">
        <h2 className="title">Booking Summary</h2>
        <div className="yellow-line"></div>
      </div>
      
      <div className="bus-info">
        <div className="bus-icon">
          <Bus size={20} />
        </div>
        <span className="bus-name">{bus.busName}</span>
      </div>
      
      <div className="location-info">
        <div className="location">
          <MapPin size={18} />
          <span>{bus.fromStop.stop}</span>
        </div>
        <div className="time">
          {bus.fromStop.time}
        </div>
      </div>
      
      <div className="divider"></div>
      
      <div className="location-info">
        <div className="location">
          <MapPin size={18} />
          <span>{bus.toStop.stop}</span>
        </div>
        <div className="time">
          {bus.toStop.time}
        </div>
      </div>
      
      <div className="date-info">
        <CalendarDays size={18} />
        <span>{date || "Today"}</span>
      </div>
      
      <div className="passenger-section">
        <div className="passenger-counter">
          <span>Passengers</span>
          <div className="counter-buttons">
            <button onClick={decreasePassengers} className="counter-btn minus">
              <Minus size={16} />
            </button>
            <span className="passenger-count">{passengers}</span>
            <button onClick={increasePassengers} className="counter-btn plus">
              <Plus size={16} />
            </button>
          </div>
        </div>
        
        <div className="fare-info">
          <span>Fare per person</span>
          <span className="fare">₹{farePerPerson}</span>
        </div>
      </div>
      
      <div className="total-section">
        <span>Total</span>
        <span className="total-amount">₹{farePerPerson * passengers}</span>
      </div>
      
      <p>{message}</p>

      <button className="pay-now-btn" onClick={paymentFunction}>
        Pay Now
      </button>
      
      <button className="cancel-btn" onClick={onCancel}>
        Cancel
      </button>
    </div>
   </div>
  );
}

export default BookingCard;