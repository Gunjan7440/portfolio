const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const messageRoutes = require("./routes/messageRoutes");
app.use("/api/messages", messageRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// port
const PORT = process.env.PORT || 5000;

// start server AFTER DB connection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

startServer();