const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose");
const twilio = require('twilio')
dotenv.config();
// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


const accountSid = 'AC974f71f7fd96e738beca2c33874ef6a8'
const authToken = '5feef721c17983e1a7190c37713bccf4'
const client = twilio(accountSid, authToken);
const otpStore = {}; // In-memory store for OTPs


app.post("/send-otp", (req, res) => {
  const { phone } = req.body;

  if (!/^\+?[1-9]\d{1,14}$/.test(phone)) {
    return res.status(400).json({ message: "Invalid phone number format" });
  }

  const otp = Math.floor(10000 + Math.random() * 900000); // Random 6-digit OTP
  client.messages
    .create({
      body: `Your OTP is ${otp}`,
      from: `+19786523566`,
      to: phone,
    })
    .then(() => {
      otpStore[phone] = otp;
      res.status(200).send({ success: true });
    })
    .catch((err) => {
      console.log("Error:", err.message);
      res.status(500).send({ success: false, message: "Failed to send OTP" });
    });
});

// Route to verify OTP
app.post("/verify-otp", (req, res) => {
const { phone, otp } = req.body;

if (!phone || !otp) {
  return res
    .status(400)
    .json({ success: false, message: "Phone number and OTP are required" });
}

const storedOtp = otpStore[phone];

if (parseInt(otp) === storedOtp) {
  delete otpStore[phone]; // Remove OTP after successful verification
  return res.json({
    success: true,
    verified: true,
    message: "OTP verified successfully",
  });
} else {
  return res.json({
    success: false,
    verified: false,
    message: "Invalid OTP",
  });
}
});




const instance = new Razorpay({
  key_id: process.env.SECRET_ID,
  key_secret: process.env.SECRET_KEY,
});



// Schema for razorpay order:
const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
});
const Payment = mongoose.model("Payment", paymentSchema);









// routes
app.get("/", (req, res) => {
  res.send("Server is running!");
});



app.post("/checkout", async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  console.log(order);
  res.status(200).json({
    success: true,
    order,
  });
});



// Payment Verification Route
app.post("/paymentVerification",async (req, res) => {
  const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
   const body = razorpay_order_id + "|" + razorpay_payment_id;
   const expectedSignature = crypto.createHmac("sha256", process.env.SECRET_KEY)
     .update(body.toString())
     .digest("hex");
    const isauth = expectedSignature === razorpay_signature;
    if(isauth){
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`);
    }
    else{
      res.status(400).json({
        success: false,
        message: "Transaction Failed",
      });
    }

});



app.get('/api/getkey' , (req, res) => {
  return res.status(200).json({
    key: process.env.SECRET_ID
  })
})

// Connect to MongoDB
connectDB();

// Use Routes
app.use("/api", authRoutes);

// app.use("/api/payments", paymentRoutes);

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});