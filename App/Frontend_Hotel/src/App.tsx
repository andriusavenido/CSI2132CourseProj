import { useState } from 'react'
import MainPage from './pages/MainPage'
import { Routes, Route } from 'react-router'
import EmployeeLogin from './pages/EmployeeLogin'
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/employee" element={<EmployeeLogin />} />
    </Routes>
    </>
  )
}

export default App
