import React from 'react'
import Footer from '../Components/Footer'
import SearchComponent from '../Components/SearchComponent'
import Header from '../Components/UserComponents/Header'

function UserHome() {
  return (
    <>
          <Header/>
            <div style={{ height: '100vh' }}>
                <SearchComponent style={{height:'50vh'}} />
                {/* <RecentTrips  style={{height:'50vh'}}/> */}
           </div>
            <Footer/>
    </>
  )
}

export default UserHome