import React, { useEffect, useState } from 'react'
import UserAxios from '../Axios/UserAxios'
import './MyTicketComponent.css'
function MyTicketComponent() {
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
    <div className='my-ticket-container'>
        <div className='scroll-container'></div>
        <div className='ticket-side-container'></div>
    </div>
  )
}

export default MyTicketComponent