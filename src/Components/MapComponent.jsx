import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

// Create custom bus icon with better URL and error handling
const busIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1801/1801439.png',
  iconSize: [40, 40], // size of the icon
  iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -20], // point from which the popup should open relative to the iconAnchor
  className: 'bus-icon' // custom class for styling
});

// Alternative bus icon URLs to try if the first one fails
const busIconAlt = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/741/741407.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
  className: 'bus-icon-alt'
});

// Create a colored bus icon using data URI (always works)
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

      // Add new markers with custom bus icons
      markers.forEach(marker => {
        // Use the SVG bus icon as it's guaranteed to work
        const leafletMarker = L.marker([marker.lat, marker.lng], { icon: busIconSVG });
        if (marker.popupContent) {
          leafletMarker.bindPopup(marker.popupContent);
        }
        leafletMarker.addTo(mapInstanceRef.current);
      });
    }
  }, [markers]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
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
    </div>
  );
};

// App component with Ernakulam, Kerala markers
const App = () => {
  // Ernakulam, Kerala coordinates
  const mapCenter = [9.9312, 76.2673];
  const mapZoom = 12;
  
  // Bus stops and routes for booking app in Ernakulam
  const mapMarkers = [
  {   
    lat: 9.9816, 
    lng: 76.2999, 
    popupContent: '<b>Bus: Fort Queen Express</b><br>🚌 Route: Fort Kochi ➡️ Aluva<br>📍 Departure: 8:00 AM' 
  },
  {
    lat: 9.9591,
    lng: 76.2897,
    popupContent: '<b>Bus: Marine Breeze</b><br>🚌 Route: Marine Drive ➡️ Kakkanad<br>📍 Departure: 9:30 AM'
  },
  {
    lat: 9.9398,
    lng: 76.2602,
    popupContent: '<b>Bus: Junction Cruiser</b><br>🚌 Route: Ernakulam Jn ➡️ Thrissur<br>📍 Departure: 7:45 AM'
  },
  {
    lat: 9.9368,
    lng: 76.3101,
    popupContent: '<b>Bus: Island Runner</b><br>🚌 Route: Willingdon Island ➡️ Vyttila<br>📍 Departure: 10:15 AM'
  },
  {
    lat: 9.9784,
    lng: 76.2946,
    popupContent: '<b>Bus: Chinese Net Travels</b><br>🚌 Route: Chinese Nets ➡️ Kaloor<br>📍 Departure: 11:00 AM'
  },
  {
    lat: 9.9574,
    lng: 76.2711,
    popupContent: '<b>Bus: MG Rapid</b><br>🚌 Route: MG Road ➡️ Edappally<br>📍 Departure: 12:00 PM'
  },
  {
    lat: 9.9312, 
    lng: 76.2673, 
    popupContent: '<b>Bus: Ave Maria Express</b><br>🚌 Route: Ernakulam ➡️ Kottayam<br>📍 Departure: 9:00 AM'
  }
];


  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <LeafletMap 
        center={mapCenter} 
        zoom={mapZoom} 
        markers={mapMarkers} 
      />
    </div>
  );
};

export default App;