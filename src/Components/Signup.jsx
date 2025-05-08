import React, { useState } from 'react';
import "./Signup.css"
import {userRegister} from "../Api/UserApi"
import { useNavigate } from 'react-router-dom';
const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile:'',
    password: '',
    confirmPassword:''
  });

  const [message,setMessage] = useState()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    if (formData.password !== formData.confirmPassword) {
       setMessage("the password is not match")
      return;
    }

    const sendData ={
      name:formData.name,
      email:formData.email,
      mobile:formData.mobile,
      password:formData.password
    }
   const response =  await userRegister(sendData)

   if (response && response.success) {
    navigate('/user/userHome')
  } else {
    setMessage("Registration failed")
  }

    
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">SwiftBus</h2>
        <p className="subtitle">Create an account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="input"
            required
          />
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input"
            required
          />
          <input 
            type="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className="input"
            required
          />
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="input"
            required
          />
          <input 
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="input"
            required
          />
          {message && <p>{message}</p>}
          <p className="login-text">
            Already have an account? Login
          </p>
          <button type="submit" className="btn">
              Sign Up
            </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
