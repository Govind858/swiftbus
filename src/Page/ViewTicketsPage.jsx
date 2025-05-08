import React from 'react'
import NavBar from '../Components/NavBar'
import BookingHistory from '../BusDriver/Components/BookingHistory'
import BusTicket from '../Components/BusTicket'
import Header from '../Components/UserComponents/Header'
import MyTicketComponent from '../Components/MyTicketComponent'

function viewTicketsPage() {
  return (
    <div>
        <Header/>
        <MyTicketComponent/>
    </div>
  )
}

export default viewTicketsPage