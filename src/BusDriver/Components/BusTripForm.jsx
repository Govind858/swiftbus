import React, { useState } from 'react';
import './BusTripForm.css';
import BusOperatorAxios from "../../Axios/BusOperatorAxios"

const BusTripForm = () => {
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [formData, setFormData] = useState({
    busName: '',
    startLocation: '',
    endLocation: '',
    numberOfStops: 0,
    stops: []
  });

  // Handle change for main form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'numberOfStops') {
      const numStops = parseInt(value) || 0;
      const newStops = [...formData.stops];
      
      // Add or remove stops based on the new number
      if (numStops > formData.stops.length) {
        // Add new stops
        for (let i = formData.stops.length; i < numStops; i++) {
          newStops.push({ name: '', time: '', distance: '' });
        }
      } else {
        // Remove extra stops
        newStops.length = numStops;
      }
      
      setFormData({
        ...formData,
        [name]: numStops,
        stops: newStops
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle change for stop details
  const handleStopChange = (index, e) => {
    const { name, value } = e.target;
    const updatedStops = [...formData.stops];
    updatedStops[index] = { ...updatedStops[index], [name]: value };
    
    setFormData({
      ...formData,
      stops: updatedStops
    });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Construct payload matching backend schema
    const payload = {
      busName: formData.busName,
      tripsStop: formData.stops.map(stop => ({
        stop: stop.name,
        time: stop.time,
        distanceFromStart: parseFloat(stop.distance)
      }))
    };
  
    console.log(payload)
    try {
      const response = await BusOperatorAxios.post('/trips/', payload);
      console.log('Trip created:', response.data);
      setSubmissionMessage("Trip created successfully");
    } catch (error) {
      console.error('Failed to create trip:', error);
      setSubmissionMessage("Trip creation unsuccessful");
    }
  };
    

  return (
    <div className="form-container">
      <div className="form-header">
        <h2 className="form-title">Add Bus Trip</h2>
        <p className="form-subtitle">Create a new bus route with stops and timing details</p>
      </div>
      
      <form onSubmit={handleSubmit} className="bus-trip-form">
        <div className="form-section">
          <h3 className="form-section-title">Basic Information</h3>
          
          {/* Bus Name */}
          <div className="form-field">
            <label htmlFor="busName" className="form-label">
              Bus Name
            </label>
            <input
              type="text"
              id="busName"
              name="busName"
              value={formData.busName}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter bus name or number"
              required
            />
            <span className="input-hint">Provide a unique identifier for this bus</span>
          </div>
          
          {/* Start and End Location */}
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="startLocation" className="form-label">
                Starting Point
              </label>
              <input
                type="text"
                id="startLocation"
                name="startLocation"
                value={formData.startLocation}
                onChange={handleChange}
                className="form-input"
                placeholder="Origin station or terminal"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="endLocation" className="form-label">
                Destination
              </label>
              <input
                type="text"
                id="endLocation"
                name="endLocation"
                value={formData.endLocation}
                onChange={handleChange}
                className="form-input"
                placeholder="Final destination"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3 className="form-section-title">Route Details</h3>
          
          {/* Number of Stops */}
          <div className="form-field">
            <label htmlFor="numberOfStops" className="form-label">
              Number of Stops
            </label>
            <input
              type="number"
              id="numberOfStops"
              name="numberOfStops"
              value={formData.numberOfStops}
              onChange={handleChange}
              min="0"
              className="form-input"
              placeholder="Enter the number of intermediate stops"
            />
            <span className="input-hint">This will generate forms for each stop on the route</span>
          </div>
        </div>
        
        {/* Dynamic Stop Fields */}
        {formData.numberOfStops > 0 && (
          <div className="stops-section">
            <h3 className="section-title">Stop Details</h3>
            <div className="stops-list">
              {formData.stops.map((stop, index) => (
                <div key={index} className="stop-card">
                  <div className="stop-number">{index + 1}</div>
                  <h4 className="stop-title">Stop #{index + 1}</h4>
                  <div className="stop-fields">
                    <div className="form-field">
                      <label htmlFor={`stop-${index}-name`} className="form-label">
                        Stop Name
                      </label>
                      <input
                        type="text"
                        id={`stop-${index}-name`}
                        name="name"
                        value={stop.name}
                        onChange={(e) => handleStopChange(index, e)}
                        className="form-input"
                        placeholder="Location name"
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor={`stop-${index}-time`} className="form-label">
                        Arrival Time
                      </label>
                      <input
                        type="time"
                        id={`stop-${index}-time`}
                        name="time"
                        value={stop.time}
                        onChange={(e) => handleStopChange(index, e)}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor={`stop-${index}-distance`} className="form-label">
                        Distance from Start (km)
                      </label>
                      <input
                        type="number"
                        id={`stop-${index}-distance`}
                        name="distance"
                        value={stop.distance}
                        onChange={(e) => handleStopChange(index, e)}
                        className="form-input"
                        placeholder="Distance in kilometers"
                        min="0"
                        step="0.1"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Submit Button */}
        <div className="form-actions">
          <button
            type="submit"
            className="submit-button"
          >
            Save Trip Details
          </button>
        </div>
      </form>
      {submissionMessage && (
        <div className="submission-message">
            <div className='input-hint'>
            To view the trip, go to View Trips.
            </div>
    {submissionMessage}
  </div>
)}

    </div>
  );
};

export default BusTripForm;