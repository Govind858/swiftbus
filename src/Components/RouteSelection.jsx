import React, { useState } from 'react';
import { 
  MapPin, 
  ArrowRightLeft, 
  Calendar, 
  Users, 
  Search,
  Bus,
  Clock,
  DollarSign 
} from 'lucide-react';
import './RouteSelection.css';

// Mock data for cities
const citiesData = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 
  'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'
];

// Mock bus data
const busMockData = [
  {
    id: 1,
    busOperator: 'Volvo Travels',
    departureTime: '08:00 AM',
    arrivalTime: '04:00 PM',
    duration: '8h 00m',
    seats: 32,
    price: 850,
    busType: 'AC Sleeper'
  },
  {
    id: 2,
    busOperator: 'Shree Travels',
    departureTime: '10:30 AM',
    arrivalTime: '06:30 PM',
    duration: '8h 00m',
    seats: 45,
    price: 750,
    busType: 'AC Semi Sleeper'
  },
  {
    id: 3,
    busOperator: 'Orange Travels',
    departureTime: '07:15 AM',
    arrivalTime: '03:15 PM',
    duration: '8h 00m',
    seats: 28,
    price: 950,
    busType: 'Luxury AC'
  },
  {
    id: 4,
    busOperator: 'Green Lines',
    departureTime: '09:45 AM',
    arrivalTime: '05:45 PM',
    duration: '8h 00m',
    seats: 40,
    price: 680,
    busType: 'AC Coach'
  }
];

const RouteSelection = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [availableBuses, setAvailableBuses] = useState([]);

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearch = () => {
    if (fromCity && toCity && travelDate) {
      console.log('Searching routes:', {
        from: fromCity,
        to: toCity,
        date: travelDate,
        passengers
      });
      // Simulate bus search - replace with actual API call
      setAvailableBuses(busMockData);
    }
  };

  const handlePayNow = (busId) => {
    console.log(`Paying for bus ${busId}`);
    // Add payment navigation or modal logic
  };

  return (
    <div className="route-search-container">
      <div className="route-search-card">
        <div className="route-search-inputs">
          {/* From City Selection */}
          <div className="route-input-group">
            <label>From</label>
            <div className="route-select-wrapper">
              <MapPin className="route-input-icon" />
              <select 
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="route-select"
              >
                <option value="">Select Origin</option>
                {citiesData
                  .filter(city => city !== toCity)
                  .map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))
                }
              </select>
            </div>
          </div>

          {/* Swap Cities Button */}
          <button 
            type="button" 
            className="swap-cities-btn"
            onClick={swapCities}
          >
            <ArrowRightLeft />
          </button>

          {/* To City Selection */}
          <div className="route-input-group">
            <label>To</label>
            <div className="route-select-wrapper">
              <MapPin className="route-input-icon" />
              <select 
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="route-select"
              >
                <option value="">Select Destination</option>
                {citiesData
                  .filter(city => city !== fromCity)
                  .map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))
                }
              </select>
            </div>
          </div>

          {/* Travel Date */}
          <div className="route-input-group">
            <label>Date</label>
            <div className="route-select-wrapper">
              <Calendar className="route-input-icon" />
              <input 
                type="date" 
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="route-select"
              />
            </div>
          </div>

          {/* Passengers */}
          <div className="route-input-group">
            <label>Passengers</label>
            <div className="route-select-wrapper">
              <Users className="route-input-icon" />
              <select 
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value))}
                className="route-select"
              >
                {[1,2,3,4,5].map(num => (
                  <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button 
            className="search-routes-btn"
            onClick={handleSearch}
            disabled={!fromCity || !toCity || !travelDate}
          >
            <Search />
            <span>Searched Buses</span>
          </button>
        </div>
      </div>

      {/* Bus Results Section */}
      {availableBuses.length > 0 && (
        <div className="bus-results-container">
          <h3 className="bus-results-title">
            Available Buses: {fromCity} to {toCity}
          </h3>
          <div className="bus-results-scroll">
            {availableBuses.map((bus) => (
              <div key={bus.id} className="bus-card">
                <div className="bus-header">
                  <Bus className="bus-icon" />
                  <h4>{bus.busOperator}</h4>
                  <span className="bus-type">{bus.busType}</span>
                </div>
                <div className="bus-details">
                  <div className="bus-time-info">
                    <div className="departure-time">
                      <Clock size={16} />
                      <span>{bus.departureTime}</span>
                    </div>
                    <div className="duration">
                      {bus.duration}
                    </div>
                    <div className="arrival-time">
                      <Clock size={16} />
                      <span>{bus.arrivalTime}</span>
                    </div>
                  </div>
                  <div className="bus-pricing">
                    <div className="seats-available">
                      <Users size={16} />
                      <span>{bus.seats} Seats</span>
                    </div>
                    <div className="price">
                      <DollarSign size={16} />
                      <span>₹{bus.price}</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="pay-now-btn"
                  onClick={() => handlePayNow(bus.id)}
                >
                  Pay Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteSelection;