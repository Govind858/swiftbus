import React, { useState } from 'react';
import BusCard from "./BusCard";
import {
  MapPin,
  Calendar,
  Search
} from 'lucide-react';
import { IoMdSwap } from "react-icons/io";
import './RouteSelection.css';
import UserAxios from '../Axios/UserAxios';
import { calculateFare } from '../Api/UserApi';

const SearchComponent = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [matchedStops, setMatchedStops] = useState([]);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!from || !to) {
      alert("Please enter both origin and destination");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await UserAxios.post('/trips/search', { from, to });
      setSearched(true);

      const availableBus = response.data.availableBus;

      // Safety check
      if (!availableBus || !Array.isArray(availableBus.trip)) {
        console.warn("No trip data available.");
        setMatchedStops([]); // clear previous results
        return;
      }

      const buses = availableBus.trip;

      const processedStops = buses.map((bus) => {
        const stops = bus.tripsStop || [];

        const fromStop = stops.find(stop => stop.stop.toLowerCase() === from.toLowerCase());
        const toStop = stops.find(stop => stop.stop.toLowerCase() === to.toLowerCase());

        if (fromStop && toStop) {
          const distance = toStop.distanceFromStart - fromStop.distanceFromStart;
          const fare = calculateFare(distance);
          return {
            distance,
            fare,
            busName: bus.busName,
            busOperatorId: bus.createdBy,
            fromStop,
            toStop,
          };
        }

        return null;
      }).filter(item => item !== null);

      setMatchedStops(processedStops);
    } catch (error) {
      setSearched(true);
      console.error('Error searching for buses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="route-search-container">
      <div className="route-search-card">
        <form onSubmit={handleSearch} className="route-search-form">
          <div className="route-search-inputs">
            <div className="route-input-group from-input">
              <label htmlFor="from-input">From</label>
              <div className="route-select-wrapper">
                <MapPin className="route-input-icon" />
                <input
                  id="from-input"
                  type="text"
                  name="from"
                  placeholder="Enter origin city"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="route-select"
                  required
                />
              </div>
            </div>
            
            <div className='swap-btn-container'>
              <button 
                type="button"
                className='swap-btn' 
                onClick={handleSwap}
                aria-label="Swap origin and destination"
              >
                <IoMdSwap className='swap-icon'/>
              </button>
            </div>

            <div className="route-input-group to-input">
              <label htmlFor="to-input">To</label>
              <div className="route-select-wrapper">
                <MapPin className="route-input-icon" />
                <input
                  id="to-input"
                  type="text"
                  name="to"
                  placeholder="Enter destination city"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="route-select"
                  required
                />
              </div>
            </div>

            <div className="route-input-group date-input">
              <label htmlFor="date-input">Date</label>
              <div className="route-select-wrapper">
                <Calendar className="route-input-icon" />
                <input
                  id="date-input"
                  type="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="route-select"
                />
              </div>
            </div>

            <button
              type="submit"
              className="search-routes-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <Search />
                  <span>Search Buses</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="bus-results-wrapper">
        <BusCard buses={matchedStops} searched={searched} />
      </div>
    </div>
  );
};

export default SearchComponent;