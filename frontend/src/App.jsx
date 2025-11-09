import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer"
import Home from "./pages/Home"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import StudentDashboard from "./components/student/StudentDashboard"
import InstituteDashboard from "./components/institute/InstituteDashboard"
import CompanyDashboard from "./components/company/CompanyDashboard"
import AdminDashboard from "./components/admin/AdminDashboard"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/institute-dashboard" element={<InstituteDashboard />} />
            <Route path="/company-dashboard" element={<CompanyDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
