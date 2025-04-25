const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const dotenv = require("dotenv");
dotenv.config();
// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


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