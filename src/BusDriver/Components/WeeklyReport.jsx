import React from "react";
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
import "./Chart.css"; // Import CSS file for styling

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BookingBarChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // 7 Days
    datasets: [
      {
        label: "Bookings",
        data: [50, 70, 40, 90, 60, 80, 100], // Data for 7 days
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Makes the chart responsive
    scales: {
      y: { 
        beginAtZero: true 
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly Booking Summary",
      },
    },
  };

  return (
    <div className="revenue-visualization">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BookingBarChart;