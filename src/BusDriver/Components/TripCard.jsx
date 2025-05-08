import React from 'react';
import './TripCard.css';

const TripCard = ({ trip, index }) => {
  const totalStops = trip.stops.length;
  
  return (
    <div className="trip-card">
      <div className="trip-card-header">
        <h3 className="trip-card-title">Trip {index + 1}</h3>
        <span className="trip-card-stops">{totalStops} stops</span>
      </div>
      
      <div className="trip-card-content">
        <div className="trip-card-route">
          <div className="trip-endpoint">
            <div className="location-dot start-dot"></div>
            <div>
              <div className="location-name">{trip.startLocation}</div>
              <div className="location-time">Departure: {trip.startTime}</div>
            </div>
          </div>
          
          {totalStops > 0 && (
            <div className="trip-stops-summary">
              <div className="stops-line"></div>
              <div className="stops-count">{totalStops} stops</div>
            </div>
          )}
          
          <div className="trip-endpoint">
            <div className="location-dot end-dot"></div>
            <div>
              <div className="location-name">{trip.endLocation}</div>
              <div className="location-time">Arrival: {trip.endTime}</div>
            </div>
          </div>
        </div>
        
        {totalStops > 0 && (
          <div className="trip-stops-preview">
            <h4 className="stops-preview-title">Stops:</h4>
            <div className="stops-list">
              {trip.stops.map((stop, idx) => (
                <div key={idx} className="stop-preview-item">
                  <span className="stop-location">{stop.location}</span>
                  <span className="stop-time">{stop.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripCard;