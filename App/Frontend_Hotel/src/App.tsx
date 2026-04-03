import MainPage from './pages/MainPage'
import { Routes, Route } from 'react-router'
import EmployeeLogin from './pages/EmployeeLogin'
import CustomerLogin from './pages/CustomerLogin'
import HotelChainSelection from './pages/HotelChainSelection'
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/employee" element={<EmployeeLogin />} />
      <Route path="/customer" element={<CustomerLogin/>} />
      <Route path="/customer/chains" element={<HotelChainSelection/>} />
      <Route path="/customer/chains/:chainsId" element={<CustomerLogin/>} />
    </Routes>
    </>
  )
}

export default App
