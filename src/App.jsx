import React from 'react'
import { Routes, Route } from 'react-router-dom';

import BusTicketHomeScreen from './Page/Home'
import AuthPage from './Components/AuthPage'
import UserHome from './Page/UserHome'
import TicketHistory from './Page/TicketHistory'
import DriverHome from './Page/DriverHome'
import BusRegistration from './Page/BusRegistration'
import TripsPage from './Page/TripsPage'
import BookingHistoryPage from './Page/BookingHistoryPage'
import DriverDashboardPage from './Page/DriverDashboardPage'
import RevenuePage from './Page/RevenuePage'
import AuthenticationPage from './Page/AuthenticationPage'
import LoginPage from './Page/LoginPage'
import SearchPage from './Page/SearchPage'
import BusOperatorLoginPage from './Page/BusOperatorLoginPage'
import ViewTripsPage from './Page/ViewTripsPage'
import ViewTicketsPage from './Page/ViewTicketsPage'
import BusOperatorBookingHistory from './Page/BusOperatorBookingHistory'
import TestLoginPage from './Page/TestLoginPage'
import MyTicketPage from './Page/MyTicketPage'


function App() {
  return (
    <Routes>
      <Route path="/" element={<BusTicketHomeScreen />} />
      <Route path="/user/userHome" element={<UserHome />} />
      <Route path="/user/history" element={<ViewTicketsPage />} />
      <Route path="/user/login" element={<LoginPage />} />
      <Route path="/user/search" element={<SearchPage />} />
      <Route path="/user/authentication" element={<AuthenticationPage />} />
      <Route path='/user/my-ticket' element={<MyTicketPage/>}/>

      <Route path="/bus-operator/home" element={<DriverHome />} />
      <Route path="/bus-operator/bus-registration" element={<BusRegistration />} />
      <Route path="/bus-operator/trips" element={<TripsPage />} />
      <Route path="/bus-operator/bookings" element={<BookingHistoryPage />} />
      <Route path="/bus-operator/dashboard" element={<DriverDashboardPage />} />
      <Route path="/bus-operator/revenue" element={<RevenuePage />} />
      <Route path="/bus-operator/login" element={<BusOperatorLoginPage />} />
      <Route path="/bus-operator/view-trips" element={<ViewTripsPage />} />
      <Route path='/bus-operator/history' element={<BusOperatorBookingHistory/>} />
      <Route path="/test-login" element={<TestLoginPage />} />
    </Routes>
  )
}

export default App
