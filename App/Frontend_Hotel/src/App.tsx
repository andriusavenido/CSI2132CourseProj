import MainPage from './pages/MainPage'
import { Routes, Route } from 'react-router'
import EmployeeLogin from './pages/EmployeeLogin'
import CustomerLogin from './pages/CustomerLogin'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/employee" element={<EmployeeLogin />} />
      <Route path="/customer" element={<CustomerLogin/>} />
      <Route path="/chains/" element={<CustomerLogin/>} />
      <Route path="/chains/:chainsId" element={<CustomerLogin/>} />
    </Routes>
    </>
  )
}

export default App
