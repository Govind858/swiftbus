import React from 'react'
import TripPlanner from '../BusDriver/Components/TripPlanner'
import DriverNavbar from '../BusDriver/Components/DriverNavBar'
import WeeklyReport from  '../BusDriver/Components/WeeklyReport'
import QRScanner from '../BusDriver/Components/QRScanner'
import BusTripForm from '../BusDriver/Components/BusTripForm'

function TripsPage() {
  return (
    <div>
        <DriverNavbar/>
        <BusTripForm/>
    </div>
  )
}

export default TripsPage