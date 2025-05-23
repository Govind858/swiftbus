import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import userAxios from "../Axios/UserAxios";
import BusLocationSelector from './BusLocationSelector';

// Create custom bus icon with SVG (always works)
const busIconSVG = L.icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="35" height="35">
      <rect x="10" y="25" width="80" height="50" rx="8" fill="#4A90E2" stroke="#2E5C8A" stroke-width="2"/>
      <rect x="15" y="30" width="25" height="15" fill="#87CEEB" stroke="#5A9FD4" stroke-width="1"/>
      <rect x="45" y="30" width="25" height="15" fill="#87CEEB" stroke="#5A9FD4" stroke-width="1"/>
      <rect x="75" y="30" width="10" height="15" fill="#87CEEB" stroke="#5A9FD4" stroke-width="1"/>
      <circle cx="25" cy="80" r="8" fill="#333"/>
      <circle cx="75" cy="80" r="8" fill="#333"/>
      <circle cx="25" cy="80" r="4" fill="#666"/>
      <circle cx="75" cy="80" r="4" fill="#666"/>
      <rect x="35" y="70" width="30" height="8" fill="#4A90E2"/>
      <text x="50" y="58" font-family="Arial" font-size="12" fill="white" text-anchor="middle">BUS</text>
    </svg>
  `),
  iconSize: [35, 35],
  iconAnchor: [17.5, 17.5],
  popupAnchor: [0, -17.5]
});

// Fix for default markers in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LeafletMap = ({ center = [9.9312, 76.2673], zoom = 13, markers = [] }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [tripData, setTripData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to create popup content with button
  const createPopupContent = (marker) => {
    const popupDiv = document.createElement('div');
    popupDiv.innerHTML = `
      <div style="min-width: 200px;">
        ${marker.popupContent}
        <hr style="margin: 10px 0;">
        <button 
          id="fetch-trip-${marker.id}" 
          style="
            background-color: #4A90E2;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
            font-size: 14px;
            margin-top: 5px;
          "
          onmouseover="this.style.backgroundColor='#357ABD'"
          onmouseout="this.style.backgroundColor='#4A90E2'"
        >
          View Trip Details
        </button>
      </div>
    `;

    // Add click event listener to the button
    const button = popupDiv.querySelector(`#fetch-trip-${marker.id}`);
    
    button.addEventListener('click', async () => {
      button.textContent = 'Loading...';
      button.disabled = true;
      setIsLoading(true);
      
      try {
        const response = await userAxios.get(`/user/fetch-trip/${marker.id}`);
        
        // Store the trip data
        console.log('Trip data fetched for bus ID:', marker.id);
        console.log('Response data:', response.data);
        const trip = response.data.trip;
        setTripData(trip); // Set the trip data to be passed to BusLocationSelector
        
        button.textContent = 'Trip Details Loaded';
        button.style.backgroundColor = '#28a745';
        
        // Scroll to the bus selector component
        const busSelector = document.getElementById('bus-location-selector');
        if (busSelector) {
          busSelector.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (error) {
        console.error('Error fetching trip data:', error);
        button.textContent = 'View Trip Details';
        button.disabled = false;
      } finally {
        setIsLoading(false);
      }
    });

    return popupDiv;
  };

  useEffect(() => {
    // Initialize the map only once
    if (!mapInstanceRef.current && mapRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        center: center,
        zoom: zoom,
      });

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);
    }

    // Clean up function - only runs when component unmounts
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array - only run once

  // Update map view when center or zoom changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom);
    }
  }, [center, zoom]);

  // Update markers when markers prop changes
  useEffect(() => {
    if (mapInstanceRef.current && markers && Array.isArray(markers)) {
      // Clear existing markers
      mapInstanceRef.current.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });

      // Add new markers with custom bus icons and enhanced popups
      markers.forEach(marker => {
        // Use the SVG bus icon as it's guaranteed to work
        const leafletMarker = L.marker([marker.lat, marker.lng], { icon: busIconSVG });
        
        // Create popup with button
        const popupContent = createPopupContent(marker);
        leafletMarker.bindPopup(popupContent, {
          maxWidth: 300,
          className: 'custom-popup'
        });

        leafletMarker.addTo(mapInstanceRef.current);
      });
    }
  }, [markers]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
      <div style={{ position: 'relative', marginBottom: '30px' }}>
        <div 
          ref={mapRef} 
          style={{ 
            height: '500px', 
            width: '800px',
            border: '2px solid #333',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        />
        {isLoading && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            zIndex: 1000
          }}>
            Loading trip data...
          </div>
        )}
      </div>
      
      {/* Bus Location Selector with trip data passed as prop */}
      <div id="bus-location-selector">
        <BusLocationSelector tripData={tripData} />
      </div>
    </div>
  );
};

// App component with Ernakulam, Kerala markers
const App = () => {
  // Ernakulam, Kerala coordinates
  const mapCenter = [9.9312, 76.2673];
  const mapZoom = 12;
  
  // Bus stops and routes for booking app with MongoDB IDs
  const mapMarkers = [
    {   
      id: '681f2c115e92b6debf40f7c1', // MongoDB ID
      lat: 9.9816, 
      lng: 76.2999, 
      popupContent: '<b>Jacquline</b><br>🚌 Route: Kottayam ➡️ Ettumanoor<br>📍 Departure: 8:00 AM',
    },
    {
      id: '6819a474ed615e77ea650403', // MongoDB ID
      lat: 9.9591,
      lng: 76.2897,
      popupContent: '<b>Bus: Marine Breeze</b><br>🚌 Route: Marine Drive ➡️ Kakkanad<br>📍 Departure: 9:30 AM'
    },
    {
      id: '6819a474ed615e77ea650407', // MongoDB ID
      lat: 9.9398,
      lng: 76.2602,
      popupContent: '<b>Bus: Junction Cruiser</b><br>🚌 Route: Ernakulam Jn ➡️ Thrissur<br>📍 Departure: 7:45 AM'
    },
    {
      id: '6819a474ed615e77ea65040b', // MongoDB ID
      lat: 9.9368,
      lng: 76.3101,
      popupContent: '<b>Bus: Island Runner</b><br>🚌 Route: Willingdon Island ➡️ Vyttila<br>📍 Departure: 10:15 AM'
    },
    {
      id: '681f2e7a5579ef362e167f04', // MongoDB ID
      lat: 9.9784,
      lng: 76.2946,
      popupContent: '<b>Bus: Chinese Net Travels</b><br>🚌 Route: Chinese Nets ➡️ Kaloor<br>📍 Departure: 11:00 AM'
    },
    {
      id: '681f2f195579ef362e167f05', // MongoDB ID
      lat: 9.9574,
      lng: 76.2711,
      popupContent: '<b>Bus: MG Rapid</b><br>🚌 Route: MG Road ➡️ Edappally<br>📍 Departure: 12:00 PM'
    },
    {
      id: '681f2f6c5579ef362e167f07', // MongoDB ID
      lat: 9.9312, 
      lng: 76.2673, 
      popupContent: '<b>Bus: Ave Maria Express</b><br>🚌 Route: Ernakulam ➡️ Kottayam<br>📍 Departure: 9:00 AM'
    }
  ];

  return (
    <div style={{ backgroundColor: 'f8f9fa', minHeight: '100vh' }}>
      <LeafletMap 
        center={mapCenter} 
        zoom={mapZoom} 
        markers={mapMarkers} 
      />
    </div>
  );
};

export default App;