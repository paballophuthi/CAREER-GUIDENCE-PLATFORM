import React from "react"
import TestComponent from "./components/common/TestComponent.jsx"
import "./App.css"

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-gradient">
        <div className="container">
          <span className="navbar-brand">🎓 Career Guidance Platform</span>
        </div>
      </nav>
      <TestComponent />
    </div>
  )
}

export default App
