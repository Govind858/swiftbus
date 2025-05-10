
import BookingHistory from '../BusDriver/Components/BookingHistory';
import DriverDashboard from '../BusDriver/Components/DriverDashboard'
import DriverNavbar from '../BusDriver/Components/DriverNavBar'
import NewTicket from '../Components/NewTicket';
import {UserProvider} from '../BusDriver/Components/UserContext';

function DriverHome() {
  return (
    <UserProvider>
       <DriverNavbar/>
       <DriverDashboard/>
       {/* <BookingHistory/> */}
       <NewTicket/>
    </UserProvider>
  )
}

export default DriverHome