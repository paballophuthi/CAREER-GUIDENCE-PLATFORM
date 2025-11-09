const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Use CORS with the deployed frontend domain
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

app.use(express.json());

// ✅ Basic test route
app.get("/", (req, res) => {
  res.json({
    message: "Career Guidance Platform API Server",
    status: "Running",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// ✅ Health check route for Render
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    message: "API server is running correctly",
    timestamp: new Date().toISOString(),
  });
});

// ✅ Example test API
app.get("/api/test", (req, res) => {
  res.json({
    message: "API test endpoint working!",
    endpoint: "test",
    success: true,
  });
});

// ✅ Use Render’s dynamic port
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Career Guidance Platform API Server Started!");
  console.log("📍 Port:", PORT);
  console.log("🌐 Environment:", process.env.NODE_ENV);
  console.log("✅ Server is ready and listening...");
});
