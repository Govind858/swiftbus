import { useState, useEffect } from 'react';
import BusOperatorAxios from "../../Axios/BusOperatorAxios";
import { Calendar, Clock, MapPin, DollarSign, ArrowRight } from 'lucide-react';
import './BookingHistory.css';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        try {
          const response = await BusOperatorAxios.get('/bus-operator/viewBookings');
          console.log('Full API Response:', JSON.stringify(response.data, null, 2));
        
          const bookingsData = Array.isArray(response.data.tickets) ? response.data.tickets : [];
        
          console.log('Processed bookings data:', bookingsData);
          setBookings(bookingsData);
        } catch (error) {
          console.error('Error fetching bookings:', error);
          setBookings([]);
        }
        setLoading(false);
        
      } catch (err) {
        setError('Failed to load bookings. Please try again later.');
        setLoading(false);
        console.error('Error fetching bookings:', err);
      }
    };

    fetchBookings();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-card">
          <h3 className="error-title">Error</h3>
          <p className="error-message">{error}</p>
          <button 
            className="error-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="booking-history">
        <div className="booking-container">
          <h1 className="booking-title">Booking History</h1>
          <div className="empty-state">
            <h3 className="empty-title">No bookings found</h3>
            <p className="empty-message">You haven't made any bookings yet.</p>
          </div>
        </div>
      </div>
    );
  }

  console.log('Bookings data:', bookings);
  
  return (
    <div className="booking-history">
      <div className="booking-container">
        <h1 className="booking-title">Booking History</h1>
        
        <div className="booking-cards">
          {Array.isArray(bookings) && bookings.map((booking) => (
            <div key={booking._id || Math.random()} className="booking-card">
              <div className="card-header">
                <div className="header-content">
                  <h2 className="bus-name">{booking.busName || 'Bus Name Not Available'}</h2>
                  <span className="booking-id">
                    Booking ID: {booking._id ? booking._id.substring(booking._id.length - 6) : 'N/A'}
                  </span>
                </div>
              </div>
              
              <div className="card-body">
                <div className="journey-info">
                  {/* From and To section */}
                  <div className="route-details">
                    <div className="route-line">
                      <div className="start-point"></div>
                      <div className="route-path"></div>
                      <div className="end-point"></div>
                    </div>
                    
                    <div className="locations">
                      <div className="location from-location">
                        <div className="location-label">
                          <MapPin size={14} className="icon green" />
                          <span>From</span>
                        </div>
                        <div className="location-name">{booking.fromStop.stop}</div>
                        <div className="location-time">
                          <Clock size={14} className="icon" />
                          <span>{booking.fromStop.time}</span>
                        </div>
                      </div>
                      
                      <div className="location to-location">
                        <div className="location-label">
                          <MapPin size={14} className="icon red" />
                          <span>To</span>
                        </div>
                        <div className="location-name">{booking.toStop.stop}</div>
                        <div className="location-time">
                          <Clock size={14} className="icon" />
                          <span>{booking.toStop.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Journey details */}
                  <div className="trip-details">
                    <div className="detail-item">
                      <ArrowRight size={16} className="icon blue" />
                      <div className="detail-text">
                        <span className="detail-label">Distance:</span> 
                        <span className="detail-value">{booking.distance} km</span>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <DollarSign size={16} className="icon blue" />
                      <div className="detail-text">
                        <span className="detail-label">Fare:</span> 
                        <span className="detail-value">₹{booking.fare}</span>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <Calendar size={16} className="icon blue" />
                      <div className="detail-text">
                        <span className="detail-label">Journey Date:</span> 
                        <span className="detail-value">{booking.createdAt ? formatDate(booking.createdAt) : 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card-footer">
                <span className="status-badge confirmed">
                  Confirmed
                </span>
                
                <button className="details-button">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;