const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const app = express();
const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }

});


await transporter.verify();

console.log("Email server ready");

// =====================
// Middleware
// =====================
app.use(cors());
app.use(express.json());

// =====================
// API Routes
// =====================
const messageRoutes = require("./routes/messageRoutes");
app.use("/api/messages", messageRoutes);

// =====================
// Serve Frontend Files
// =====================
app.use(express.static(path.join(__dirname, "frontend")));

// Serve index.html for home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Optional: Handle other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// =====================
// Port
// =====================
const PORT = process.env.PORT || 5000;

// =====================
// Start Server
// =====================
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

startServer();