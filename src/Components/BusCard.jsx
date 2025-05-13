'use client';

import React, { useState } from 'react';
import './BusCard.css'; // This will now contain all our styles
import { MdTrendingFlat } from "react-icons/md";
import userAxios from '../Axios/UserAxios';
import BookingCard from './BookingCard';
import RenderRazorpay from '../Payments/RenderRazorpay';

function BusCard(props) {
  console.log("Props received in BusCard:", props);

  const [orderDetails, setOrderDetails] = useState({});
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [showPaymentCard, setShowPaymentCard] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);

  const handleBookClick = (bus) => {
    setSelectedBus(bus);
    setShowPaymentCard(true);
  };

  const handlePayNow = async (passengers, totalAmount) => {
    try {
      let amount = totalAmount || 500;
      let currency = "INR";
      let response = await userAxios.post('/trips/createOrder', { amount });
      console.log(response);
      setOrderDetails(response.data);
      setDisplayRazorpay(true);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const handleCancel = () => {
    setShowPaymentCard(false);
  };

  return (
    <div>
      {displayRazorpay ? (
        <RenderRazorpay
          amount={orderDetails.amount}
          currency="INR"
          orderId={orderDetails.id}
          keyId="rzp_test_mSqsAVGi288zyw"
          keySecret="STI4p5TAohWV7phBBIgD34k5"
        />
      ) : ""}

      <div className="bus-card-container">
        {props.buses && props.buses.length > 0 ? (
          props.buses.map((bus, index) => (
            <div key={index} className="bus-card">
              <div className="bus-card-header">
                <h3 className="bus-name">{bus.busName}</h3>
                <div className="route">
                  <div className="location-item">
                    <p className="stop">{bus.fromStop.stop}</p>
                    <p className="time">{bus.fromStop.time}</p>
                  </div>
                  <MdTrendingFlat className="route-arrow" />
                  <div className="location-item">
                    <p className="stop">{bus.toStop.stop}</p>
                    <p className="time">{bus.toStop.time}</p>
                  </div>
                </div>
              </div>

              <div className="details-container">
                <div className="stops-container">
                  <h4 className="stops-header">Stops</h4>
                  <ul className="stops-list">
                    <li className="stop-item">
                      <span className="stop">{bus.fromStop.stop}</span>
                      <span className="time">{bus.fromStop.time}</span>
                    </li>
                    <li className="stop-item">
                      <span className="stop">{bus.toStop.stop}</span>
                      <span className="time">{bus.toStop.time}</span>
                    </li>
                  </ul>
                </div>
                <div className="fare-container">
                  <h4 className="fare-header">Fare</h4>
                  <p className="fare">₹{bus.fare}</p>
                </div>
              </div>

              <div className="button-container">
                <button className="book-button" onClick={() => handleBookClick(bus)}>
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : props.searched ? (
          <p className="no-buses">No buses found</p>
        ) : null}
      </div>

      {showPaymentCard && selectedBus && (
        <BookingCard
          bus={selectedBus}
          date={props.date}
          onPayNow={handlePayNow}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default BusCard;