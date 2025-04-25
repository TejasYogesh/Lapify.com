const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = "mongodb://localhost:27017/Lapify";
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;