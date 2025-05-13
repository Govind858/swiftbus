import React from 'react'
import NavBar from '../Components/NavBar'
import BookingHistory from '../BusDriver/Components/BookingHistory'
import BusTicket from '../Components/BusTicket'
import Header from '../Components/UserComponents/Header'
import MyTicketComponent from '../Components/MyTicketComponent'
import Footer from '../Components/Footer'

function ViewTicketsPage() {
  return (
    <div>
        <Header/>
        <MyTicketComponent/>
        <Footer/>
    </div>
  )
}

export default ViewTicketsPage