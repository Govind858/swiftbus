import React from 'react'
import "./BookingHistory.css"
import qrCode from "../../assets/qr-code.png"

function TodaysBooking({bookings}) {
  return (
<div className="BookingHistory">
      <h1>Todays Booking</h1>
      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-info">
              <div className="user-info">
                <h2>{booking.userName}</h2>
                <span className="booking-id">Booking #{booking.id}</span>
              </div>
              
              <div className="trip-details">
                <div className="locations">
                  <div className="from-location">
                    <span className="label">From</span>
                    <span className="location">{booking.fromLocation}</span>
                  </div>
                  <div className="arrow">→</div>
                  <div className="to-location">
                    <span className="label">To</span>
                    <span className="location">{booking.toLocation}</span>
                  </div>
                </div>
                
                <div className="date-time">
                  <div className="date">
                    <span className="label">Date</span>
                    <span>{booking.date}</span>
                  </div>
                  <div className="time">
                    <span className="label">Time</span>
                    <span>{booking.time}</span>
                  </div>
                </div>
              </div>

          <div className="qr-container">
              <span className="qr-text">Scan to verify</span>
              <div className="qr-box">
                <div className='qr-box'>
                  <img 
                    src={qrCode}
                    alt="QR Code for Booking" 
                    className="qr-image" 
                  />
                </div>
              </div>
            </div>

              
              <div className="price-info">
                <span className="label">Ticket Price</span>
                <span className="price">${booking.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default TodaysBooking