import React from 'react'
import './LiveMapTrip.css'

function LiveMapTrip() {
  return (
    <div className='live-map-trip-container'>
            <div className='bus-name-live-map'>
                <h1 >Ave Maria</h1>
            </div>
        <div className='from-container'>
            <h1>select from location</h1>
        </div>
        <div className='to-container'>
            <h1>select to location</h1>
        </div>
    </div>
  )
}

export default LiveMapTrip