import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom/dist'
import Login from '../pages/Login/LoginPage'
import SignUp from '../pages/Signup/SignUp'
import Home from '../pages/index/Home'
import Dashboard from '../pages/dashboard/dashboard'

const Rotas: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/signup" element={<SignUp />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Rotas