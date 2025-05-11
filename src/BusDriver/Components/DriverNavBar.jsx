import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdHistory, MdOutlineCreate, MdOutlineViewAgenda } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { IoQrCodeSharp, IoClose, IoMenu, IoNotifications } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import ProfileDropdown from './ProfileDropdown';
import BusOperatorAxios from "../../Axios/BusOperatorAxios";
import "./drivernavbar.css"

const DriverNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const profileRef = useRef(null);
  const cameraRef = useRef(null);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const navItems = [
    { path: '/bus-operator/trips', icon: <MdOutlineCreate size={20} />, label: 'Create Trips' },
    { path: '/bus-operator/view-trips', icon: <MdOutlineViewAgenda size={20} />, label: 'View Trips', action: fetchTrips },
    { path: '/bus-operator/history', icon: <MdHistory size={20} />, label: 'Booking History' },
    { path: '/bus-operator/revenue', icon: <TbReportAnalytics size={20} />, label: 'Revenue' }
  ];

  // Toggle sidebar with animation
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle profile dropdown
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Handle navigation from sidebar
  const handleNavigation = (path, action) => {
    if (action) {
      setIsLoading(true);
      action().finally(() => {
        setIsLoading(false);
        navigate(path);
        setIsSidebarOpen(false);
      });
    } else {
      navigate(path);
      setIsSidebarOpen(false);
    }
  };

  // Toggle camera for QR scanning
  const toggleCamera = () => {
    setIsCameraOpen(!isCameraOpen);
    if (!isCameraOpen) {
      startCamera().catch(err => {
        console.error("Failed to start camera:", err);
        // Show a more user-friendly error toast/notification instead of alert
        setIsCameraOpen(false);
      });
    } else {
      stopCamera();
    }
  };

  // Start camera with improved error handling
  const startCamera = async () => {
    const videoElement = document.getElementById('qr-camera');
    if (!videoElement) return;

    try {
      // Try to get rear camera first for mobile devices
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } }
      });
      videoElement.srcObject = stream;
      return stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
      throw error;
    }
  };

  // Stop camera
  const stopCamera = () => {
    const videoElement = document.getElementById('qr-camera');
    if (videoElement?.srcObject) {
      const tracks = videoElement.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoElement.srcObject = null;
    }
  };

  // Fetch trips function
  async function fetchTrips() {
    try {
      const response = await BusOperatorAxios.get('/bus-operator/viewTrips');
      return response.data.success;
    } catch (error) {
      console.error("Failed to fetch trips:", error);
      return false;
    }
  }

  // Handle clicks outside components
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile dropdown if clicked outside
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      
      // Close camera if clicked outside
      if (cameraRef.current && !cameraRef.current.contains(event.target) && 
          !event.target.closest('.qr-scan-button')) {
        if (isCameraOpen) {
          toggleCamera();
        }
      }
      
      // Close sidebar if clicked outside on mobile
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) &&
          !event.target.closest('.menu-button') && window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    // Add keyboard accessibility - ESC key to close modals
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (isCameraOpen) toggleCamera();
        if (isProfileOpen) setIsProfileOpen(false);
        if (isSidebarOpen && window.innerWidth < 768) setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      stopCamera();
    };
  }, [profileRef, cameraRef, sidebarRef, isCameraOpen, isProfileOpen, isSidebarOpen]);

  return (
    <div className="driver-navbar-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <button 
            className="menu-button" 
            aria-label="Menu" 
            onClick={toggleSidebar}
            aria-expanded={isSidebarOpen}
          >
            <IoMenu size={24} />
          </button>
          <Link to="/bus-operator/home" className="logo">
            <span className="logo-text">SwiftBus</span>
          </Link>
        </div>
        
        <div className="navbar-right">
          {/* QR Code Scanner Button */}
          <div className="nav-action-item">
            <button 
              className="action-button qr-scan-button" 
              aria-label="Scan QR Code" 
              onClick={toggleCamera}
            >
              <IoQrCodeSharp size={20} />
              <span className="button-label">Scan</span>
            </button>
          </div>
          
          {/* Notifications */}
          <div className="nav-action-item">
            <button className="action-button notification-button" aria-label="Notifications">
              <IoNotifications size={20} />
              <span className="notification-badge">5</span>
            </button>
          </div>
          
          {/* Profile */}
          <div className="nav-action-item profile-container" ref={profileRef}>
            <button 
              className="action-button profile-button" 
              aria-label="Profile" 
              onClick={toggleProfile}
              aria-expanded={isProfileOpen}
            >
              <div className="avatar">
                <LuUser size={20} />
              </div>
            </button>
            {isProfileOpen && <ProfileDropdown />}
          </div>
        </div>
      </nav>
      
      {/* Sidebar */}
      <div 
        className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
        ref={sidebarRef}
        aria-hidden={!isSidebarOpen}
      >
        <div className="sidebar-header">
          <Link to="/bus-operator/home" className="sidebar-logo">SwiftBus</Link>
          <button className="close-sidebar-button" onClick={toggleSidebar} aria-label="Close menu">
            <IoClose size={20} />
          </button>
        </div>
        
        <div className="sidebar-content">
          <div className="sidebar-menu">
            {navItems.map((item, index) => (
              <button
                key={index}
                className="sidebar-menu-item"
                onClick={() => handleNavigation(item.path, item.action)}
                disabled={isLoading}
              >
                <span className="menu-item-icon">{item.icon}</span>
                <span className="menu-item-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* QR Scanner Camera View */}
      <div 
        ref={cameraRef} 
        className={`qr-scanner-container ${isCameraOpen ? 'open' : ''}`}
        aria-hidden={!isCameraOpen}
      >
        <div className="qr-scanner-header">
          <h3>Scan QR Code</h3>
          <button className="close-camera-button" onClick={toggleCamera} aria-label="Close camera">
            <IoClose size={20} />
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
      
      {/* Overlays */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      ></div>
      <div 
        className={`camera-overlay ${isCameraOpen ? 'open' : ''}`} 
        onClick={toggleCamera}
        aria-hidden="true"
      ></div>
    </div>
  );
};

export default DriverNavbar;