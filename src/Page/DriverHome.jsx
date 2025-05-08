
import BookingHistory from '../BusDriver/Components/BookingHistory';
import DriverDashboard from '../BusDriver/Components/DriverDashboard'
import DriverNavbar from '../BusDriver/Components/DriverNavBar'
import {UserProvider} from '../BusDriver/Components/UserContext';

function DriverHome() {
  return (
    <UserProvider>
       <DriverNavbar/>
       <DriverDashboard/>
       <BookingHistory/>
    </UserProvider>
  )
}

export default DriverHome