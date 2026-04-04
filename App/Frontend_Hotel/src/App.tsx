import MainPage from './pages/MainPage'
import { Routes, Route } from 'react-router'
import EmployeeLogin from './pages/EmployeeLogin'
import EmployeeDashboard from './pages/EmployeeDashboard'
import EmployeeProfile from './pages/EmployeeProfile'
import CustomerLogin from './pages/CustomerLogin'
import HotelChainSelection from './pages/HotelChainSelection'
import HotelSelection from './pages/HotelSelection'
import RoomSelection from './pages/RoomSelection'
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/employee" element={<EmployeeLogin />} />
      <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
      <Route path="/employee/profile" element={<EmployeeProfile />} />
      <Route path="/customer" element={<CustomerLogin/>} />
      <Route path="/customer/chains" element={<HotelChainSelection/>} />
      <Route path="/customer/chains/:chainsId" element={<HotelSelection/>} />
      <Route path="/customer/hotels/:hotelId" element={<RoomSelection/>} />
    </Routes>
    </>
  )
}

export default App
