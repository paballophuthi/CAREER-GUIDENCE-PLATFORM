import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-gradient shadow">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">
          🎓 Career Guidance Platform - Lesotho
        </a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto">
            <a className="nav-link" href="/login">Login</a>
            <a className="nav-link" href="/register">Register</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
