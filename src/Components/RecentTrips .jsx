import React from 'react';
import { 
  ArrowRightLeft, 
  Repeat,
  MapPin,
  Calendar
} from 'lucide-react';
import './RecentTrips.css';

// Mock recent trips data
const recentTripsMockData = [
  {
    id: 1,
    from: 'Mumbai',
    to: 'Pune',
    date: '2024-02-15',
    busOperator: 'Volvo Travels',
    status: 'Completed',
    price: 850
  },
  {
    id: 2,
    from: 'Delhi',
    to: 'Bangalore',
    date: '2024-01-20',
    busOperator: 'Shree Travels',
    status: 'Completed',
    price: 1200
  },
  {
    id: 3,
    from: 'Hyderabad',
    to: 'Chennai',
    date: '2024-03-01',
    busOperator: 'Orange Travels',
    status: 'Completed',
    price: 950
  },
  {
    id: 4,
    from: 'Kolkata',
    to: 'Ahmedabad',
    date: '2024-02-28',
    busOperator: 'Green Lines',
    status: 'Completed',
    price: 1100
  }
];

const RecentTrips = ({ 
  trips = recentTripsMockData, 
  onRepeatTrip = () => {},
  showAllTrips = () => {} 
}) => {
  return (
    <div className="recent-trips-container">
      <div className="recent-trips-header">
        <h3 className="recent-trips-title">
          <Repeat size={20} /> Recent Trips
        </h3>
        <button 
          className="view-all-trips-btn"
          onClick={showAllTrips}
        >
          View All
        </button>
      </div>
      <div className="recent-trips-scroll">
        {trips.map((trip) => (
          <div key={trip.id} className="recent-trip-card">
            <div className="recent-trip-route">
              <div className="recent-trip-cities">
                <div className="city-info">
                  <MapPin size={16} className="city-icon" />
                  <span className="from-city">{trip.from}</span>
                </div>
                <ArrowRightLeft size={16} className="route-arrow" />
                <div className="city-info">
                  <MapPin size={16} className="city-icon" />
                  <span className="to-city">{trip.to}</span>
                </div>
              </div>
              <div className="recent-trip-details">
                <div className="trip-date-info">
                  <Calendar size={16} className="date-icon" />
                  <span className="trip-date">{trip.date}</span>
                </div>
                <span className="trip-price">₹{trip.price}</span>
              </div>
              <div className="trip-additional-info">
                <span className="trip-operator">{trip.busOperator}</span>
                <span className={`trip-status ${trip.status.toLowerCase()}`}>
                  {trip.status}
                </span>
              </div>
            </div>
            <button 
              className="repeat-trip-btn"
              onClick={() => onRepeatTrip(trip)}
            >
              Repeat Trip
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTrips;