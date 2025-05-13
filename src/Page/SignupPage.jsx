import React from 'react'
import Signup from '../Components/Signup'
import img  from '../assets/sign-img.jpg'
import { div } from 'framer-motion/client'
import  './SignupPage.css'

function SignupPage() {
  return (
    <div className='main-container'>
      <div className='signup-container'>
        <div>
            <Signup/>
        </div>
        <div className='img-container'>
            <img src={img} alt="" />
        </div>
    </div>
    </div>
  )
}

export default SignupPage