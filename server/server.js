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
dotenv.config();
// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));







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