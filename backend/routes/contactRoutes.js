const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    await Message.create({ name, email, message });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    await transporter.sendMail({
        from: email,
        to: process.env.EMAIL,
        subject: "New Portfolio Message",
        text: message
    });

    res.json({ message: "Message sent successfully!" });
});

module.exports = router;