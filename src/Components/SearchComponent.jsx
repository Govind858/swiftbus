import React, { useState, useEffect, useRef } from 'react';
import BusCard from "./BusCard";
import {
  MapPin,
  Calendar,
  Search,
  Loader
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
  
  // Auto-suggestion states
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [loadingFromSuggestions, setLoadingFromSuggestions] = useState(false);
  const [loadingToSuggestions, setLoadingToSuggestions] = useState(false);
  
  // Refs for DOM elements
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const fromSuggestionsRef = useRef(null);
  const toSuggestionsRef = useRef(null);

  // Add API endpoint inspection on component mount
  useEffect(() => {
    console.log("Component mounted - Checking API configuration");
    console.log("UserAxios base URL:", UserAxios.defaults.baseURL);
    console.log("UserAxios default headers:", UserAxios.defaults.headers);
    
    // Test API connection with a small request
// Update the testApiConnection function to use the correct path
const testApiConnection = async () => {
  try {
    console.log("Testing API connection...");
    const testQuery = "test";
    const response = await UserAxios.get(`/user/auto-suggest?q=${encodeURIComponent(testQuery)}`);
    console.log("API connection test result:", response);
    console.log("API data format:", typeof response.data, Array.isArray(response.data));
  } catch (error) {
    console.error("API connection test failed:", error);
    console.log("Error details:", {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data
      } : 'No response data'
    });
  }
};
    
    testApiConnection();
  }, []);

  // Handle clicks outside suggestion dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close "From" suggestions if clicked outside
      if (fromSuggestionsRef.current && 
          !fromSuggestionsRef.current.contains(event.target) &&
          fromInputRef.current && 
          !fromInputRef.current.contains(event.target)) {
        setShowFromSuggestions(false);
      }
      
      // Close "To" suggestions if clicked outside
      if (toSuggestionsRef.current && 
          !toSuggestionsRef.current.contains(event.target) &&
          toInputRef.current && 
          !toInputRef.current.contains(event.target)) {
        setShowToSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch suggestions from API
  const fetchSuggestions = async (query, setterFunction, setLoadingFunction) => {
    if (!query || query.trim() === '') {
      setterFunction([]);
      setLoadingFunction(false);
      console.log("Empty query, not fetching suggestions");
      return;
    }

    console.log(`Fetching suggestions for: "${query}"`);
    setLoadingFunction(true);
    try {
      console.log(`API call: /auto-suggest?q=${encodeURIComponent(query)}`);
      const response = await UserAxios.get(`/user/auto-suggest?q=${encodeURIComponent(query)}`);
      console.log("API response:", response);
      
      if (response.data && Array.isArray(response.data)) {
        console.log("Suggestions found:", response.data);
        setterFunction(response.data);
      } else {
        console.log("Response data is not an array:", response.data);
        setterFunction([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      console.log("Error details:", {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data
        } : 'No response data'
      });
      setterFunction([]);
    } finally {
      setLoadingFunction(false);
    }
  };

  // Debounce function to prevent excessive API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Create debounced functions only once
  const debouncedFromFetch = useRef(
    debounce((query) => {
      console.log(`Debounced from fetch triggered with query: "${query}"`);
      fetchSuggestions(query, setFromSuggestions, setLoadingFromSuggestions);
    }, 300)
  ).current;
  
  const debouncedToFetch = useRef(
    debounce((query) => {
      console.log(`Debounced to fetch triggered with query: "${query}"`);
      fetchSuggestions(query, setToSuggestions, setLoadingToSuggestions);
    }, 300)
  ).current;

  // Handle input changes
  const handleFromChange = (e) => {
    const value = e.target.value;
    console.log("From input changed to:", value);
    setFrom(value);
    if (value.trim()) {
      console.log("Triggering debounced fetch for 'from' field");
      debouncedFromFetch(value);
      setShowFromSuggestions(true);
    } else {
      console.log("Clearing 'from' suggestions due to empty input");
      setFromSuggestions([]);
      setShowFromSuggestions(false);
    }
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    console.log("To input changed to:", value);
    setTo(value);
    if (value.trim()) {
      console.log("Triggering debounced fetch for 'to' field");
      debouncedToFetch(value);
      setShowToSuggestions(true);
    } else {
      console.log("Clearing 'to' suggestions due to empty input");
      setToSuggestions([]);
      setShowToSuggestions(false);
    }
  };

  // Handle suggestion selection
  const handleSelectFromSuggestion = (suggestion) => {
    setFrom(suggestion);
    setShowFromSuggestions(false);
  };

  const handleSelectToSuggestion = (suggestion) => {
    setTo(suggestion);
    setShowToSuggestions(false);
  };

  // Handle form submission
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

  // Handle origin-destination swap
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
            {/* From input with suggestions */}
            <div className="route-input-group from-input">
              <label htmlFor="from-input">From</label>
              <div className={`route-select-wrapper ${showFromSuggestions ? 'active' : ''}`}>
                <MapPin className="route-input-icon" />
                <input
                  id="from-input"
                  type="text"
                  name="from"
                  placeholder="Enter origin city"
                  value={from}
                  onChange={handleFromChange}
                  onFocus={() => {
                    if (from.trim()) {
                      setShowFromSuggestions(true);
                      debouncedFromFetch(from);
                    }
                  }}
                  className="route-select"
                  required
                  ref={fromInputRef}
                  autoComplete="off"
                />
                {showFromSuggestions && (
                  <div className="suggestions-dropdown" ref={fromSuggestionsRef}>
                    {loadingFromSuggestions ? (
                      <div className="suggestion-loading">
                        <Loader className="animate-spin mr-2" size={16} />
                        <span>Loading suggestions...</span>
                      </div>
                    ) : fromSuggestions.length > 0 ? (
                      fromSuggestions.map((suggestion, index) => (
                        <div 
                          key={index} 
                          className="suggestion-item"
                          onClick={() => handleSelectFromSuggestion(suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))
                    ) : (
                      <div className="suggestion-empty">No locations found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Swap button */}
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

            {/* To input with suggestions */}
            <div className="route-input-group to-input">
              <label htmlFor="to-input">To</label>
              <div className={`route-select-wrapper ${showToSuggestions ? 'active' : ''}`}>
                <MapPin className="route-input-icon" />
                <input
                  id="to-input"
                  type="text"
                  name="to"
                  placeholder="Enter destination city"
                  value={to}
                  onChange={handleToChange}
                  onFocus={() => {
                    if (to.trim()) {
                      setShowToSuggestions(true);
                      debouncedToFetch(to);
                    }
                  }}
                  className="route-select"
                  required
                  ref={toInputRef}
                  autoComplete="off"
                />
                {showToSuggestions && (
                  <div className="suggestions-dropdown" ref={toSuggestionsRef}>
                    {loadingToSuggestions ? (
                      <div className="suggestion-loading">
                        <Loader className="animate-spin mr-2" size={16} />
                        <span>Loading suggestions...</span>
                      </div>
                    ) : toSuggestions.length > 0 ? (
                      toSuggestions.map((suggestion, index) => (
                        <div 
                          key={index} 
                          className="suggestion-item"
                          onClick={() => handleSelectToSuggestion(suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))
                    ) : (
                      <div className="suggestion-empty">No locations found</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Date input */}
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

            {/* Search button */}
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

      {/* Results section */}
      <div className="bus-results-wrapper">
        <BusCard buses={matchedStops} searched={searched} />
      </div>
    </div>
  );
};

export default SearchComponent;