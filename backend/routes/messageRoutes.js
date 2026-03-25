const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// ✅ POST (SAVE MESSAGE)
router.post("/", async (req, res) => {
  console.log("DATA RECEIVED:", req.body); // 🔥 DEBUG

  try {
    const { name, email, message } = req.body;

    // ❗ Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: "All fields are required" 
      });
    }

    const newMessage = new Message({
      name,
      email,
      message
    });

    await newMessage.save();

    res.json({ 
      success: true, 
      message: "Message saved successfully" 
    });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ 
      success: false, 
      error: "Server Error" 
    });
  }
});

// ✅ GET (FETCH ALL MESSAGES)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: "Failed to fetch messages" 
    });
  }
});

module.exports = router;