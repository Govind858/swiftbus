import React, { useState } from 'react';
import BusCard from "./BusCard";
import {
  MapPin,
  Calendar,
  Search
} from 'lucide-react';
import { IoMdSwap } from "react-icons/io";
import { MdSwapHorizontalCircle } from "react-icons/md";
import './RouteSelection.css';
import UserAxios from '../Axios/UserAxios';
import { calculateFare } from '../Api/UserApi';

const SearchComponent = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [data, setDate] = useState("");
  const [matchedStops, setMatchedStops] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await UserAxios.post('/trips/search', { from, to });

      console.log("Response from server:", response.data); // 🔍 Inspect the response
      setSearched(true  )

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
          const distance = toStop.distanceFromStart - fromStop.distanceFromStart
          const fare = calculateFare(distance)
          return {
            distance,
            fare,
            busName: bus.busName,
            busOperatorId:bus.createdBy,
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
    }
  };

  console.log("Matched Stops:", matchedStops); // ✅ For debugging

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="route-search-container">
      <div className="route-search-card">
        <div className="route-search-inputs">
          <div className="route-input-group">
            <label>From</label>
            <div className="route-select-wrapper">
              <MapPin className="route-input-icon" />
              <input
                type="text"
                name="from"
                placeholder="Enter origin city"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="route-select"
              />
            </div>
          </div>
          <div className='swap-btn-container'>
            <button className='swap-btn' onClick={handleSwap}>
              
            <IoMdSwap   className='swap-icon'/>

            </button>
          </div>

          <div className="route-input-group">
            <label>To</label>
            <div className="route-select-wrapper">
              <MapPin className="route-input-icon" />
              <input
                type="text"
                name="to"
                placeholder="Enter destination city"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="route-select"
              />
            </div>
          </div>

          <div className="route-input-group">
            <label>Date</label>
            <div className="route-select-wrapper">
              <Calendar className="route-input-icon" />
              <input
                type="date"
                name="date"
                value={data}
                onChange={(e) => setDate(e.target.value)}
                className="route-select"
              />
            </div>
          </div>

          <button
            className="search-routes-btn"
            onClick={handleSearch}
          >
            <Search />
            <span>Search Buses</span>
          </button>
        </div>
      </div>

      <BusCard buses={matchedStops} searched={searched} />
      
    </div>
  );
};

export default SearchComponent;