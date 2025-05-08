import React, { useState, useRef, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import { MdHistory } from "react-icons/md";
import { CgArrowsExchange } from "react-icons/cg";
import { TbReportAnalytics } from "react-icons/tb";
import { IoQrCodeSharp } from "react-icons/io5";
import { MdOutlineCreate } from "react-icons/md";
import { MdOutlineViewAgenda } from "react-icons/md";
import { LuUser } from "react-icons/lu";


import './DriverNavbar.css'; // Import CSS file
import BusOperatorAxios from "../../Axios/BusOperatorAxios"
const DriverNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const profileRef = useRef(null);
  const cameraRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeSidebar();
  };

  // New function to toggle camera view
 // Add this to your toggleCamera function
const toggleCamera = () => {
  setIsCameraOpen(!isCameraOpen);
  if (!isCameraOpen) {
    // Start the camera when opening
    startCamera().catch(err => {
      console.error("Failed to start camera:", err);
      alert("Could not access camera. Please check permissions.");
      setIsCameraOpen(false); // Close the camera view if failed
    });
  } else {
    // Stop the camera when closing
    stopCamera();
  }
};

  // Function to start camera
// Modify the startCamera function
const startCamera = () => {
  const videoElement = document.getElementById('qr-camera');
  if (videoElement && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Remove the facingMode constraint for laptops
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoElement.srcObject = stream;
      })
      .catch(error => {
        console.error("Error accessing camera:", error);
        // Show error message to user
        alert("Camera access failed. Please check permissions or try another browser.");
      });
  }
};

  // Function to stop camera
  const stopCamera = () => {
    const videoElement = document.getElementById('qr-camera');
    if (videoElement && videoElement.srcObject) {
      const tracks = videoElement.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoElement.srcObject = null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      
      // Close camera if clicking outside the camera container
      if (cameraRef.current && !cameraRef.current.contains(event.target) && 
          !event.target.closest('.qr-scan-button')) {
        if (isCameraOpen) {
          toggleCamera();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Clean up camera when component unmounts
      if (isCameraOpen) {
        stopCamera();
      }
    };
  }, [profileRef, cameraRef, isCameraOpen]);

  const fetchTrips = async () => {
    try {
        const response = await BusOperatorAxios.get('/bus-operator/viewTrips')

        if(response.data.succes){
          console.log('data fetched')
        }else{
          console.log('faild to fetch data')
        }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <button className="menu-button" aria-label="Menu" onClick={toggleSidebar}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <div className="logo">
          <Link to="/bus-operator/home" className="logo">
      SwiftBus
    </Link>
          </div>
        </div>
        
        <div className="navbar-right">
          
          {/* QR Code Scanner Button */}
          <div className="qr-scan-container">
            <button className="qr-scan-button" aria-label="Scan QR Code" onClick={toggleCamera}>
            < IoQrCodeSharp className='scan-btn' />
            </button>
            <span className="qr-button-text">scan</span>
          </div>
          
          <button className="notification-button" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="notification-badge">5</span>
          </button>
          
          <div className="profile-container" ref={profileRef}>
            <button className="profile-button" aria-label="Profile" onClick={toggleProfile}>
              <div className="avatar"><LuUser /></div>
            </button>
            {isProfileOpen && <ProfileDropdown />}
          </div>
        </div>
      </nav>
      
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-menu">
            
            <div className="sidebar-menu-item" onClick={() => handleNavigation('/bus-operator/trips')}> <MdOutlineCreate />
            Create trips</div>
            <div className="sidebar-menu-item" onClick={() => {fetchTrips(),handleNavigation('/bus-operator/view-trips')}}> <MdOutlineViewAgenda />
            View Trips</div>
            <div className="sidebar-menu-item" onClick={() => handleNavigation('/bus-operator/history')}><MdHistory id='side-bar-icons' />Booking History</div>
            <div className="sidebar-menu-item" onClick={() => handleNavigation('/bus-operator/revenue')}>  <TbReportAnalytics id='side-bar-icons' />
            Revenue</div>
          </div>
        </div>
      </div>
      
      {/* QR Scanner Camera View */}
      <div ref={cameraRef} className={`qr-scanner-container ${isCameraOpen ? 'open' : ''}`}>
        <div className="qr-scanner-header">
          <h3>Scan QR Code</h3>
          <button className="close-camera-button" onClick={toggleCamera}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="camera-view">
          <video id="qr-camera" autoPlay playsInline></video>
          <div className="scan-overlay">
            <div className="scan-target"></div>
          </div>
        </div>
        <div className="qr-scanner-footer">
          <p>Position the QR code within the frame to scan</p>
        </div>
      </div>
      
      {/* Overlay */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={closeSidebar}></div>
      <div className={`camera-overlay ${isCameraOpen ? 'open' : ''}`} onClick={toggleCamera}></div>
    </>
  );
};

export default DriverNavbar;