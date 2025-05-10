import React, { useState } from 'react';
import './NewSearchComponent.css'
import { IoMdSwap } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import UserAxios from '../Axios/UserAxios';
import BusCard from './BusCard';
import {calculateFare} from "../Api/UserApi"


function NewSearchComponent() {
     const [from, setFrom] = useState("");
      const [to, setTo] = useState("");
      const [date, setDate] = useState("");
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
    <div className='bus-finder-container'>
        <div className='bus-finder'>
            <div className='from-div'>
                <input id='from' 
                type="text"
                 placeholder='from' 
                 value={from}
                onChange={(e) => setFrom(e.target.value)} />
            </div>
            <div className='swap-div'>
                <button id='swap-btn'>
                    <IoMdSwap />
                </button>
            </div>
            <div className='to-div'>
             <input 
             id='to' 
             type="text" 
             placeholder='to'
             value={to}
             onChange={(e) => setTo(e.target.value)} />
            </div>
            <div className='date-div'>
                <input 
                type='date' 
                id='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}/>
            </div>
            <div>
               <button className='search-btn'
                  onClick={handleSearch}>
               <FaSearch />
               search
               </button>
            </div>
        </div>
              <BusCard buses={matchedStops} searched={searched} />
    </div>
  )
}

export default NewSearchComponent