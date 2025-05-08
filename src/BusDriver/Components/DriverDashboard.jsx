import React, { useContext } from "react";
import "./DriverDashboard.css";
import { useAuth } from "../../ContextTesting/Components/AuthContext"

const DriverDashboard = () => {
  const totalEarnings = 1250.75;
  const todayEarnings = 85.50;
  const todayBookings = [
    { id: 1, customer: "John Smith", pickup: "123 Main St", dropoff: "456 Oak Ave", time: "09:30 AM", amount: 25.50, status: "Completed" },
    { id: 2, customer: "Sarah Johnson", pickup: "789 Pine Rd", dropoff: "321 Elm St", time: "11:45 AM", amount: 32.00, status: "Completed" },
    { id: 3, customer: "Michael Brown", pickup: "555 Cedar Ln", dropoff: "777 Maple Dr", time: "02:15 PM", amount: 28.00, status: "In Progress" }
  ];

  const { user } = useAuth();

 
  return (
    
    <div className="DriverDashboard">

      

      <h1>Driver Dashboard</h1>


      {/* Earnings Cards */}
      <div className="earnings-container">
        <div className="earnings-card">
          <h2>Total Earnings</h2>
          <p className="earnings-amount">${totalEarnings.toFixed(2)}</p>
          <p>Lifetime earnings</p>
        </div>

        
      
        <div className="earnings-card">
          <h2>Today's Earnings</h2>
          <p className="earnings-amount">${todayEarnings.toFixed(2)}</p>
          <p>Updated in real-time</p>
        </div>
      </div>

   
     
    </div>
  );
};

export default DriverDashboard;
