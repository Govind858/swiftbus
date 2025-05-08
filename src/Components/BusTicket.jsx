"use client"
import React, { useEffect, useState } from 'react'
import UserAxios from '../Axios/UserAxios'
import "./BusTicket.css"
import qrCode from "../assets/qr-code.png"
import { FaArrowRight } from "react-icons/fa6";

function BusTicket() {
    const [ticket,setTicket] = useState([])

   useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await UserAxios.get('/user/viewTicket')
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
  )
}

export default BusTicket