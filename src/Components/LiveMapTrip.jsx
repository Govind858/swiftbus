  import React from 'react';
  import './LiveMapTrip.css'; // Make sure your CSS file is correctly linked

  function LiveMapTrip({ trip }) {
    console.log("in child :", trip);

    // Safely get the 'from' and 'to' locations from the tripsStop array
    const fromLocation = trip?.tripsStop?.[0]?.location || 'From Location';
    const toLocation = trip?.tripsStop?.[trip.tripsStop.length - 1]?.location || 'To Location';

    return (
      <div className='live-map-trip-container'>
        {/* Bus Name */}
        <div className='bus-name-live-map'>
          <h1>{trip.busName}</h1>
        </div>

        {/* From and To Locations */}
        <div className='from-to-container'>
          <div className='from-container'>
            <h2>From: {fromLocation}</h2>
          </div>
          <div className='to-container'>
            <h2>To: {toLocation}</h2>
          </div>
        </div>

        {/* Trip Stops */}
        <div className='trip-stops-container'>
          <h3>All Stops:</h3>
          {trip?.tripsStop && trip.tripsStop.length > 0 ? (
            <ul>
              {trip.tripsStop.map((stop, index) => (
                <li key={stop._id || index}> {/* Use stop._id as key if available, otherwise index */}
                  <strong>{stop.location}</strong>
                  <p>Arrival: {stop.arrivalTime}</p>
                  <p>Departure: {stop.departureTime}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No trip stops available.</p>
          )}
        </div>

        {/* Other trip details (optional, if you want to display _id or __v) */}
        <div className='other-details'>
          <p>Trip ID: {trip?._id || 'N/A'}</p>
          {/* <p>Version: {trip?.__v || 'N/A'}</p> */}
        </div>
      </div>
    );
  }

  export default LiveMapTrip;