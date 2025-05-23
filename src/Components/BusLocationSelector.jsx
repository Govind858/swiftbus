// BusLocationSelector.jsx
import { useState, useEffect } from 'react';
import './BusLoctionSelector.css';
import { calculateFare } from '../Api/UserApi';
import BookingCard from './BookingCard'; // Import the BookingCard component
import { distance } from 'framer-motion';

export default function BusLocationSelector({ tripData }) {
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [availableToLocations, setAvailableToLocations] = useState([]);
  const [fare, setFare] = useState(0);
  const [differenceDistance, setDifferenceDistance] = useState(0);
  const [showBookingCard, setShowBookingCard] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  
  // Extract bus name and stops from tripData if available
  const busName = tripData?.busName || "Select Bus Route";
  const busStops = tripData?.tripsStop || [];
  console.log('in bus selector component:', tripData);
  
  // Reset selections when tripData changes
  useEffect(() => {
    setFromLocation(null);
    setToLocation(null);
    setAvailableToLocations([]);
    setFare(0);
    setDifferenceDistance(0);
    setSelectedBus(null);
  }, [tripData]);
  
  // Update available "To" locations when "From" location changes
  useEffect(() => {
    if (fromLocation !== null && tripData?.tripsStop?.length > 0) {
      // Find the index of the selected "From" location
      const fromIndex = tripData.tripsStop.findIndex(stop => stop._id === fromLocation._id);
      
      if (fromIndex !== -1) {
        // Only show stops that come after the selected "From" location
        const filteredLocations = tripData.tripsStop.slice(fromIndex + 1);
        setAvailableToLocations(filteredLocations);
        setToLocation(null); // Reset "To" location when "From" changes
      }
    } else {
      setAvailableToLocations([]);
    }
  }, [fromLocation?._id, tripData?.tripsStop]);

  // Console log and calculate distance when both locations are selected
  useEffect(() => {
    if (fromLocation && toLocation) {
      console.log('From Location:', fromLocation);
      console.log('To Location:', toLocation);
      
      // Calculate distance difference
      const distanceDiff = toLocation.distanceFromStart - fromLocation.distanceFromStart;
      console.log('Distance Difference (To - From):', distanceDiff);
      setDifferenceDistance(distanceDiff);
      
      const calculatedFare = calculateFare(distanceDiff);
      console.log('Calculated Fare:', calculatedFare);
      setFare(calculatedFare);
    }
  }, [fromLocation, toLocation]);

  const handleFromSelection = (stop) => {
    setFromLocation(stop);
  };

  const handleToSelection = (stop) => {
    setToLocation(stop);
  };

  const handleBookNow = () => {
    // Create selectedBus object with the format expected by BookingCard
    const busData = {
      busName: busName,
      fare: fare,
      fromStop: {
        stop: fromLocation.stop,
        time: fromLocation.time,
        distanceFromStart: fromLocation.distanceFromStart
      },
      toStop: {
        stop: toLocation.stop,
        time: toLocation.time,
        distanceFromStart: toLocation.distanceFromStart

      },
      createdBy: tripData.createdBy,
      distance: differenceDistance,
      // Add any other needed data
      tripId: tripData._id || tripData.id
    };
    
    setSelectedBus(busData);
    setShowBookingCard(true);
  };

  const handleCancel = () => {
    setShowBookingCard(false);
    setSelectedBus(null);
  };
  
  // If no trip data is available yet
  if (!tripData) {
    return (
      <div className="bus-selector-container">
        <h1 className="bus-name">Select a bus from the map</h1>
        <div className="location-section">
          <div className="prompt-text">Please click on a bus marker and select "View Trip Details" to load route information.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bus-selector-container">
      {/* Bus Name Header */}
      <h1 className="bus-name">{busName}</h1>
      <p className="bus-date">Date: {tripData.date}</p>

      {/* From Location Selection */}
      <div className="location-section">
        <h2 className="location-title">From Location</h2>
        <div className="stop-options">
          {busStops.map((stop, index) => (
            <div
              key={`from-${stop._id}`}
              onClick={() => handleFromSelection(stop)}
              className={`stop-option from-option ${fromLocation?._id === stop._id ? 'selected' : ''}`}
            >
              {index + 1}. {stop.stop} 
              <span className="time-info">
                {stop.time}
              </span>
            </div>
          ))}
        </div>
        {fromLocation && (
          <div className="selection-feedback">
            Selected: {fromLocation.stop} (Time: {fromLocation.time})
          </div>
        )}
      </div>
      
      {/* To Location Selection */}
      <div className="location-section">
        <h2 className="location-title">To Location</h2>
        {fromLocation ? (
          <>
            <div className="stop-options">
              {availableToLocations.length > 0 ? (
                availableToLocations.map((stop) => {
                  const originalIndex = busStops.findIndex(s => s._id === stop._id);
                  return (
                    <div
                      key={`to-${stop._id}`}
                      onClick={() => handleToSelection(stop)}
                      className={`stop-option to-option ${toLocation?._id === stop._id ? 'selected' : ''}`}
                    >
                      {originalIndex + 1}. {stop.stop}
                      <span className="time-info">
                        {stop.time}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="prompt-text">No available destinations after this stop</div>
              )}
            </div>
            {toLocation && (
              <div className="selection-feedback">
                Selected: {toLocation.stop} (Time: {toLocation.time})
              </div>
            )}
          </>
        ) : (
          <div className="prompt-text">Please select a "From" location first</div>
        )}
      </div>

      {/* Journey Summary */}
      {fromLocation && toLocation && (
        <div className="journey-summary">
          <h3 className="summary-title">{busName}</h3>
          <p className="summary-detail">
            From: <span className="summary-value">{fromLocation.stop}</span> 
            <span className="time-detail">(Time: {fromLocation.time})</span>
          </p>
          <p className="summary-detail">
            To: <span className="summary-value">{toLocation.stop}</span>
            <span className="time-detail">(Time: {toLocation.time})</span>
          </p>
          {/* <p className="fare-info">
            Bus: <span className="summary-value">{busName}</span>
          </p> */}
          {/* <p className="journey-date">
            Date: <span className="summary-value">{tripData.date}</span>
          </p> */}
          <p className="fare-detail">
            Fare: <span className="summary-value">₹{fare}</span>
          </p>
          <p className="distance-detail">
            Distance: <span className="summary-value">{differenceDistance} km</span>
          </p>
          
          {/* Book Now Button */}
       <div className='book-now-btn-container'>
           <button 
            className="book-now-btn"
            onClick={handleBookNow}
          >
            Book Now
          </button>
       </div>
        </div>
      )}

      {/* BookingCard Overlay */}
      {showBookingCard && selectedBus && (
        <BookingCard
          bus={selectedBus}
          date={tripData.date}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}