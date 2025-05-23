// LiveMapForm.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import LiveMapTrip from './LiveMapTrip';

function LiveMapForm() {
  const location = useLocation();
  const tripData = location.state?.tripData;

  if (!tripData) {
    return <div>No trip data found. Please go back and select a trip.</div>;
  }

  return (
    <div>
      <LiveMapTrip trip={tripData} />
    </div>
  );
}

export default LiveMapForm;