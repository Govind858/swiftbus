// BusCard.jsx
import React, { useState } from 'react';
import './BusCard.css';
import { MdTrendingFlat } from "react-icons/md";
import userAxios from '../Axios/UserAxios';
import BookingCard from './BookingCard';
import RenderRazorpay from '../Payments/RenderRazorpay';

function BusCard(props) {
  console.log("Props received in BusCard:", props);
  
  const [orderDetails, setOrderDetails] = useState({});
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [showPaymentCard, setShowPaymentCard] = useState(false); // Fixed variable name
  const [selectedBus, setSelectedBus] = useState(null);

  const handleBookClick = (bus) => { // Make sure to use the bus parameter
    setSelectedBus(bus);
    setShowPaymentCard(true);
  };
  
  // Rename this to handlePayNow for consistency with the BookingCard props
  const handlePayNow = async (passengers, totalAmount) => {
    try {
      let amount = totalAmount || 500; // Use the passed amount or default to 500
      let currency = "INR";
      let response = await UserAxios.post('/trips/createOrder', {amount});
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
      
      {props.buses && props.buses.length > 0 ? (
        props.buses.map((bus, index) => (
          <div className='bus-card' key={index}>
            <div className='bus-name-item'>{bus.busName}</div>
            <div className='bus-location-item'>
              <div>
                <p>{bus.fromStop.stop}</p>
                <p>{bus.fromStop.time}</p>
              </div>
              <MdTrendingFlat className='arrow' />
              <div>
                <p>{bus.toStop.stop}</p>
                <p>{bus.toStop.time}</p>
              </div>
            </div>
            <div className='bus-button-item'>
              <button id='card-btn' onClick={() => handleBookClick(bus)}>
                Book
              </button>
              <div>Fare:{bus.fare}</div>
            </div>
          </div>
        ))
      ) : props.searched ? (
        <p>No buses found</p>
      ) : null}

      {/* Fixed the syntax here - added && and proper brackets */}
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