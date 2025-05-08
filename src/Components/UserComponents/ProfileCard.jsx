import React from 'react'
import "./ProfileCard.css"

function ProfileCard({visible}) {
    if (!visible){
       return null
    }
  return (
    <div>
        <div className='profile-card'>
            <p>this is profile card</p>
        </div>
    </div>
  )
}

export default ProfileCard