// BusTripCard.jsx
import { useState, useEffect } from "react";
import { Clock, MapPin, Bus, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import BusOperatorAxios from "../../Axios/BusOperatorAxios"
import "./BusTripCard.css";

export default function BusTripCard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    // Fetch bus trips when component mounts
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const response = await BusOperatorAxios.get("/bus-operator/viewTrips");
        
        if (response.data.succes) { // Note: API returns "succes" (not "success")
          setTrips(response.data.trips);
        } else {
          setError("Failed to fetch trips: " + response.data.message);
        }
      } catch (err) {
        setError("Error fetching trips: " + (err.response?.data?.message || err.message));
        console.error("Error fetching trips:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading bus trips...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Something went wrong</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="no-trips-container">
        <h3>No trips found</h3>
        <p>There are currently no bus trips available.</p>
      </div>
    );
  }

  return (
    <div className="bus-trips-container">
      {trips.map(data => (
        <div key={data._id} className="bus-trip-card">
          {/* Header */}
          <div className="card-header">
            <div className="header-content">
              <div className="bus-name">
                <Bus size={22} />
                <h2>{data.busName}</h2>
              </div>
              <span className="created-date">
                <Calendar size={14} />
                {formatDate(data.createdAt)}
              </span>
            </div>
          </div>

          {/* Trip Summary */}
          <div className="trip-summary">
            <div className="route-info">
              <div className="destination">
                <MapPin size={18} className="pin-icon" />
                <span className="route-text">
                  {data.tripsStop[0].stop} → {data.tripsStop[data.tripsStop.length - 1].stop}
                </span>
              </div>
              <div className="time-info">
                <Clock size={18} />
                <span>{data.tripsStop[0].time} - {data.tripsStop[data.tripsStop.length - 1].time}</span>
              </div>
            </div>
            <div className="distance-info">
              {data.tripsStop[data.tripsStop.length - 1].distanceFromStart} km total distance
            </div>
          </div>

          {/* Stops Toggle Button */}
          <button 
            onClick={() => toggleExpanded(data._id)}
            className="toggle-button"
          >
            {expandedId === data._id ? (
              <>Hide stops <ChevronUp size={16} /></>
            ) : (
              <>View stops <ChevronDown size={16} /></>
            )} 
            ({data.tripsStop.length})
          </button>

          {/* Detailed Stops */}
          {expandedId === data._id && (
            <div className="detailed-stops">
              <h3 className="stops-heading">Trip Schedule</h3>
              <div className="stops-list">
                {data.tripsStop.map((stop, index) => (
                  <div key={stop._id} className="stop-item">
                    <div className="stop-marker">
                      <div className={`marker ${index === 0 ? 'first' : index === data.tripsStop.length - 1 ? 'last' : 'middle'}`}></div>
                      {index < data.tripsStop.length - 1 && (
                        <div className="connector"></div>
                      )}
                    </div>
                    <div className="stop-details">
                      <div className="stop-name">{stop.stop}</div>
                      <div className="stop-meta">
                        <span className="stop-time">{stop.time}</span>
                        <span className="stop-distance">{stop.distanceFromStart} km</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}