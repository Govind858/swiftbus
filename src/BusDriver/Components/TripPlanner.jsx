import React, { useState } from 'react';
import TripCard from './TripCard';
import './TripPlanner.css';
import BusOperatorAxios from "../../Axios/BusOperatorAxios"
const TripPlanner = () => {
  const [showForm, setShowForm] = useState(false);
  const [tripData, setTripData] = useState({
    busName: '',
    startLocation: '',
    endLocation: '',
    startTime: '',
    endTime: '',
    numberOfStops: 0,
    stops: []
  });
  const [showRoute, setShowRoute] = useState(false);
  const [savedTrips, setSavedTrips] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'numberOfStops') {
      const numStops = parseInt(value) || 0;
      setTripData({
        ...tripData,
        [name]: numStops,
        stops: Array(numStops).fill().map((_, i) => 
          tripData.stops[i] || { location: '', time: '' }
        )
      });
    } else {
      setTripData({
        ...tripData,
        [name]: value
      });
    }
  };

  const handleStopChange = (index, field, value) => {
    const updatedStops = [...tripData.stops];
    updatedStops[index] = {
      ...updatedStops[index],
      [field]: value
    };
    setTripData({
      ...tripData,
      stops: updatedStops
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await BusOperatorAxios.post('/trips/', tripData);
      console.log("Trip saved:", response.data);
  
      setSavedTrips([...savedTrips, tripData]);
      setShowRoute(true);
  
      // Reset form
      setTripData({
        busName: '',
        startLocation: '',
        endLocation: '',
        startTime: '',
        endTime: '',
        numberOfStops: 0,
        stops: []
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error saving trip:", error);
    }
  };
  

  const renderStopInputs = () => {    /* first funtion*/
    return tripData.stops.map((stop, index) => (
      <div key={index} className="stop-container">
        <h3 className="stop-title">Stop {index + 1}</h3>
        <div className="stop-fields">
          <div>
            <label className="input-label">Location</label>
            <input
              type="text"
              value={stop.location}
              onChange={(e) => handleStopChange(index, 'location', e.target.value)}
              className="text-input"
              placeholder="e.g. Barcelona"
            />
          </div>
          <div>
            <label className="input-label">Time</label>
            <input
              type="time"
              value={stop.time}
              onChange={(e) => handleStopChange(index, 'time', e.target.value)}
              className="text-input"
            />
          </div>
        </div>
      </div>
    ));
  };

  const renderRouteMap = () => {      /* function */
    const allLocations = [
      { name: tripData.startLocation, time: tripData.startTime },
      ...tripData.stops,
      { name: tripData.endLocation, time: tripData.endTime, location: tripData.endLocation }
    ];

    return (
      <div className="route-map">
        <h2 className="route-title">Trip Route</h2>
        <h3 className="bus-name-display">🚌 Bus: {tripData.busName}</h3>
        <div className="location-list">
          {allLocations.map((location, index) => (
            
            <div key={index} className="location-item">
              <div className="location-marker-container">
                <div className="location-marker">
                  {index + 1}
                </div>
                <div className="location-details">
                  <div className="location-name">
                    {index === 0 ? location.name : 
                     index === allLocations.length - 1 ? location.name : 
                     location.location}
                  </div>
                  <div className="location-time">
                    {index === 0 ? `Departure: ${location.time}` : 
                     index === allLocations.length - 1 ? `Arrival: ${location.time}` : 
                     `Stop time: ${location.time}`}
                  </div>
                </div>
              </div>
              {index < allLocations.length - 1 && (
                <div className="connecting-line"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="trip-planner">
      <h1 className="main-title">Create Trip</h1>
      
      {/* <div className="action-container">
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="create-button"
          >
            Create Trip
          </button>
        )}
      </div> */}

     
        <form onSubmit={handleSubmit} className="trip-form">
              <h2 className="form-title">Trip Details</h2>
          <div>
              <label className="bus-name">Bus Name</label>
              <input
                type="text"
                name="busName"
                value={tripData.busName}
                onChange={handleInputChange}
                className="text-input"
                required
              />
            </div>
          <div className="form-grid">
            <div>
              <label className="input-label">Start Location</label>
              <input
                type="text"
                name="startLocation"
                value={tripData.startLocation}
                onChange={handleInputChange}
                className="text-input"
                required
              />
            </div>
            <div>
              <label className="input-label">End Location</label>
              <input
                type="text"
                name="endLocation"
                value={tripData.endLocation}
                onChange={handleInputChange}
                className="text-input"
                required
              />
            </div>
            <div>
              <label className="input-label">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={tripData.startTime}
                onChange={handleInputChange}
                className="text-input"
                required
              />
            </div>
            <div>
              <label className="input-label">End Time</label>
              <input
                type="time"
                name="endTime"
                value={tripData.endTime}
                onChange={handleInputChange}
                className="text-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">Number of Stops</label>
            <input
              type="number"
              min="0"
              name="numberOfStops"
              value={tripData.numberOfStops}
              onChange={handleInputChange}
              className="text-input"
            />
          </div>

          {tripData.numberOfStops > 0 && (
            <div className="stops-section">
              <h3 className="stops-title">Stops Information</h3>
              {renderStopInputs()}
            </div>
          )}

          <div className="button-container">
            <button
              type="button"
              className="cancel-button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
            >
              Save Trip
            </button>
          </div>
        </form>
      

      {showRoute && renderRouteMap()}
      
      {savedTrips.length > 0 && (
        <div className="saved-trips-container">
          <h2 className="saved-trips-title">Your Trips</h2>
          <div className="trips-grid">
            {savedTrips.map((trip, index) => (
              <TripCard key={index} trip={trip} index={index} />
              
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripPlanner;