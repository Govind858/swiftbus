'use client';

import React, { useState } from 'react';
import './BusCard.css'; // Keep your existing CSS for any global styles
import { MdTrendingFlat } from "react-icons/md";
import userAxios from '../Axios/UserAxios';
import BookingCard from './BookingCard';
import RenderRazorpay from '../Payments/RenderRazorpay';

const styles = {
  cardContainer: {
    display: 'flex',
    overflowX: 'auto',
    padding: '16px',
    gap: '16px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px', // More rounded corners for a softer look
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)', // Slightly stronger shadow for better definition
    minWidth: '320px', // Slightly wider for better content spacing
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px', // Increased gap for better visual separation
    transition: 'transform 0.2s ease-in-out', // Subtle hover animation
    '&:hover': {
      transform: 'scale(1.02)', // Gentle scale up on hover
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Enhanced shadow on hover
    },
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '12px',
  },
  busName: {
    fontSize: '1.75rem', // Slightly larger and more prominent
    fontWeight: 'bold',
    color: '#2c3e50', // Darker, professional color
    marginBottom: '6px',
  },
  route: {
    fontSize: '1.1rem',
    color: '#7f8c8d', // Softer color for secondary info
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  arrow: {
    fontSize: '1.75rem',
    color: '#3498db', // More vibrant color for the arrow
  },
  locationItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  stop: {
    fontSize: '1.1rem',
    fontWeight: 'medium',
    color: '#34495e',
  },
  time: {
    fontSize: '0.95rem',
    color: '#95a5a6',
  },
  detailsContainer: {
    display: 'flex',
    justifyContent: 'space-between', // Distribute fare and stops info
    alignItems: 'center',
    gap: '16px',
  },
  stopsContainer: {
    flex: 2, // Allow more space for stops info
  },
  stopsHeader: {
    fontSize: '1.05rem',
    fontWeight: 'semibold',
    color: '#2c3e50',
    marginBottom: '8px',
  },
  stopsList: {
    listStyle: 'none',
    padding: 0,
  },
  stopItem: {
    padding: '8px 0',
    borderBottom: '1px solid #ecf0f1', // Light divider
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fareContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end', // Align fare to the right
  },
  fareHeader: {
    fontSize: '1.05rem',
    fontWeight: 'semibold',
    color: '#2c3e50',
    marginBottom: '4px',
  },
  fare: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#27ae60', // Success color for fare
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end', // Align button to the right
    marginTop: '16px',
  },
  bookButton: {
    backgroundColor: '#f39c12', // More accessible and vibrant button color
    color: '#fff',
    border: 'none',
    borderRadius: '8px', // More rounded button
    padding: '12px 24px', // Increased padding
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'semibold',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#e67e22', // Darker shade on hover
    },
  },
  noBuses: {
    padding: '16px',
    fontSize: '1rem',
    color: '#7f8c8d',
  },
};

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

      <div style={styles.cardContainer}>
        {props.buses && props.buses.length > 0 ? (
          props.buses.map((bus, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.header}>
                <h3 style={styles.busName}>{bus.busName}</h3>
                <div style={styles.route}>
                  <div style={styles.locationItem}>
                    <p style={styles.stop}>{bus.fromStop.stop}</p>
                    <p style={styles.time}>{bus.fromStop.time}</p>
                  </div>
                  <MdTrendingFlat style={styles.arrow} />
                  <div style={styles.locationItem}>
                    <p style={styles.stop}>{bus.toStop.stop}</p>
                    <p style={styles.time}>{bus.toStop.time}</p>
                  </div>
                </div>
              </div>

              <div style={styles.detailsContainer}>
                <div style={styles.stopsContainer}>
                  <h4 style={styles.stopsHeader}>Stops</h4>
                  <ul style={styles.stopsList}>
                    {/* You might want to display all stops and times if available */}
                    <li style={styles.stopItem}>
                      <span style={styles.stop}>{bus.fromStop.stop}</span>
                      <span style={styles.time}>{bus.fromStop.time}</span>
                    </li>
                    {/* Add more stops if the data structure allows */}
                    <li style={styles.stopItem}>
                      <span style={styles.stop}>{bus.toStop.stop}</span>
                      <span style={styles.time}>{bus.toStop.time}</span>
                    </li>
                    {/* Consider showing intermediate stops in a concise way */}
                  </ul>
                </div>
                <div style={styles.fareContainer}>
                  <h4 style={styles.fareHeader}>Fare</h4>
                  <p style={styles.fare}>₹{bus.fare}</p>
                </div>
              </div>

              <div style={styles.buttonContainer}>
                <button style={styles.bookButton} onClick={() => handleBookClick(bus)}>
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : props.searched ? (
          <p style={styles.noBuses}>No buses found</p>
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