const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Basic test route
app.get("/", (req, res) => {
  res.json({
    message: "Career Guidance Platform API Server",
    status: "Running",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  })
})

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    message: "API server is running correctly",
    timestamp: new Date().toISOString()
  })
})

// Test API endpoint
app.get("/api/test", (req, res) => {
  res.json({
    message: "API test endpoint working!",
    endpoint: "test",
    success: true
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("🚀 Career Guidance Platform API Server Started!")
  console.log("📍 Port: " + PORT)
  console.log("🌐 URL: http://localhost:" + PORT)
  console.log("✅ Server is ready and listening...")
})
