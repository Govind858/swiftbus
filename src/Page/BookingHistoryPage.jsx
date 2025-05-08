import React from 'react'
import BookingHistory from '../BusDriver/Components/BookingHistory'
import DriverNavbar from '../BusDriver/Components/DriverNavBar';

function BookingHistoryPage() {
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
        <DriverNavbar/>
        <BookingHistory bookings={bookingsData}/>
    </div>
  )
}

export default BookingHistoryPage