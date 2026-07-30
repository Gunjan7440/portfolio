const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");

const connectDB = require("./config/db");

const app = express();


// =====================
// Middleware
// =====================
app.use(cors());
app.use(express.json());


// =====================
// Email Configuration
// =====================

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }

});


transporter.verify((error, success) => {

  if (error) {
    console.log("❌ Email Error:", error.message);
  } else {
    console.log("✅ Email server ready");
  }

});



// =====================
// API Routes
// =====================

const messageRoutes = require("./routes/messageRoutes");

app.use("/api/messages", messageRoutes);



// =====================
// Serve Frontend
// =====================

app.use(express.static(path.join(__dirname,"frontend")));


app.get("/",(req,res)=>{

 res.sendFile(
   path.join(__dirname,"frontend","index.html")
 );

});


// =====================
// Start Server
// =====================

const PORT = process.env.PORT || 5000;


const startServer = async()=>{

 try{

   await connectDB();


   app.listen(PORT,()=>{

     console.log(`✅ Server running on port ${PORT}`);

   });


 }

 catch(error){

   console.error("❌ Database connection failed:",error);

   process.exit(1);

 }

};


startServer();