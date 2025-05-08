import React from 'react'
import DriverDashboard from '../BusDriver/Components/DriverDashboard'
import TodaysBooking from '../BusDriver/Components/TodaysBooking';

function DriverDashboardPage() {
    const bookingsData = [
        {
          id: 1,
          userName: 'John Doe',
          fromLocation: 'New York',
          toLocation: 'Los Angeles',
          date: '2025-03-07',
          time: '10:00 AM',
          price: 150.0,
        },
        {
          id: 1,
          userName: 'John Doe',
          fromLocation: 'New York',
          toLocation: 'Los Angeles',
          date: '2025-03-07',
          time: '10:00 AM',
          price: 150.0,
        }
      ];
  return (
    <div>
        <DriverDashboard/>
        <TodaysBooking bookings={bookingsData}/>
    </div>
  )
}

export default DriverDashboardPage