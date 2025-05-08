import React, { useState } from 'react';
import './RevenueComponent.css';
import WeeklyReport from '../Components/WeeklyReport';
import MonthlyReport from './MonthlyReport';

const RevenueComponent = () => {
  // State to track which report is currently active
  const [activeReport, setActiveReport] = useState('monthly');
  
  // Handler functions to switch between reports
  const showMonthlyReport = () => setActiveReport('monthly');
  const showWeeklyReport = () => setActiveReport('weekly');

  return (
    <div className="revenue-container">
      {/* Main visualization area */}
      <div className="revenue-visualization">
        {activeReport === 'weekly' ? <WeeklyReport /> : <MonthlyReport />}
      </div>
      
      {/* Controls section */}
      <div className="revenue-controls">
        <button 
          className={`revenue-button ${activeReport === 'monthly' ? 'active' : ''}`}
          onClick={showMonthlyReport}
        >
          Monthly Earnings
        </button>
        <button 
          className={`revenue-button ${activeReport === 'weekly' ? 'active' : ''}`}
          onClick={showWeeklyReport}
        >
          Weekly Earnings
        </button>
        <button className="revenue-button settings-button">
          <span className="settings-icon">⚙️</span> Settings
        </button>
      </div>
    </div>
  );
};

export default RevenueComponent;