import React from "react";
import './Chart.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./Chart.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyReport = () => {
  // February 2025 has 28 days (non-leap year)
  const februaryDays = Array.from({ length: 28 }, (_, i) => (i + 1).toString());
  
  // Generate random data for all days in February
  const bookingData = Array.from({ length: 28 }, () => 
    Math.floor(Math.random() * 100) + 20
  );

  const data = {
    labels: februaryDays,
    datasets: [
      {
        label: "Daily Bookings",
        data: bookingData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { 
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Bookings"
        }
      },
      x: {
        title: {
          display: true,
          text: "Day of Month"
        },
        ticks: {
          // Show fewer x-axis labels to avoid overcrowding
          maxTicksLimit: 14
        }
      }
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "February 2025 - Daily Booking Report",
        font: {
          size: 16
        }
      },
    },
  };

  return (
    <div className="revenue-visualization">
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyReport;