"use client"
import './BookingHistory.css';
import React, { useState, useEffect } from 'react';
import qrCode from "../../assets/qr-code.png"
import BusOperatorAxios from "../../Axios/BusOperatorAxios"
import { FaArrowRight } from "react-icons/fa6";


const BookingHistory = () => {
  const [ticket,setTicket] = useState([])

  useEffect(() => {
   const fetchTicket = async () => {
     try {
       const response = await BusOperatorAxios.get('/bus-operator/viewBookings')
       console.log(response)
       setTicket(response.data.tickets)
     } catch (error) {
       console.log(error)
     }
   }
   fetchTicket()
   
 },[])
 console.log(ticket)
  return (
       <div className='ticket-container'>
          <h1 id='heading'>tickets</h1>
          {
            ticket.map((ticket,index) => (
              <div className="ticket-card" key={index}>
               <div className='main-container'>
                 <div className='bus-name'> <p>{ticket.busName}</p></div>
                 <div className='from'>
                    <p id='location'>{ticket.fromStop.stop}</p>
                    <p id='time'>{ticket.fromStop.time}</p>
                 </div>
                 
                 <div className='direction'>
                    <div className='arrow-container'>
                      <FaArrowRight className='arrow-icon' />
                    </div>
                    <div className='journey-details'>
                      <span>{ticket.distance} km</span>
                    </div>
                 </div>
                 
                 <div className='to'>
                    <p id='location'>{ticket.toStop.stop}</p>
                    <p id='time'>{ticket.toStop.time}</p>
                 </div>
               </div>
               
               <div className='sub-container'>
                <div className='qr-box'>
                     <img id='qr-img' src={qrCode} alt="" />
                </div>
                <h3 id='fare'>fare:{ticket.fare}</h3>
               </div>
            </div>
            ))
          }
        </div>
  );
};

export default BookingHistory;