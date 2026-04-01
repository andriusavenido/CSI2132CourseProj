import { useState } from 'react'
import MainPage from './pages/MainPage'
import { Routes, Route } from 'react-router'
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
    </>
  )
}

export default App
