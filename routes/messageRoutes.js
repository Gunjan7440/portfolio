const express = require("express");
const router = express.Router();

const Message = require("../models/Message");
const nodemailer = require("nodemailer");


// POST - SAVE MESSAGE + SEND EMAIL
router.post("/", async (req, res) => {

  console.log("DATA RECEIVED:", req.body);

  try {

    const { name, email, message } = req.body;


    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success:false,
        error:"All fields are required"
      });
    }


    // Save in MongoDB
    const newMessage = new Message({
      name,
      email,
      message
    });

    await newMessage.save();



    // Send Email
    const transporter = nodemailer.createTransport({

      service:"gmail",

      auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
      }

    });



    try {

const info = await transporter.sendMail({

  from: process.env.EMAIL,
  to: process.env.EMAIL,
  replyTo: email,

  subject:"New Portfolio Contact Message",

  text:`
Name: ${name}

Email: ${email}

Message:
${message}
`

});


console.log("EMAIL SENT:", info.messageId);


}
catch(emailError){

console.log("EMAIL FAILED:", emailError.message);

}



    res.json({

      success:true,

      message:"Message sent successfully"

    });


  } catch(error){

    console.error("ERROR:", error);

    res.status(500).json({

      success:false,

      error:"Server Error"

    });

  }

});




// GET ALL MESSAGES

router.get("/", async (req,res)=>{

  try{

    const messages = await Message.find();

    res.json(messages);

  }

  catch(error){

    console.error(error);

    res.status(500).json({

      error:"Failed to fetch messages"

    });

  }

});


module.exports = router;