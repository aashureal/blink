// db.js

const mongoose = require("mongoose");

// Replace this URI with your MongoDB connection string
const mongoURI = process.env.MONGO_URI;
// const mongoURI = 'your_mongodb_atlas_url'; // For Atlas

const connectToDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB se connection successful!");
  } catch (error) {
    console.error("❌ MongoDB se connection failed:", error);
    process.exit(1); // App ko exit kara do agar DB connect na ho
  }
};

module.exports = connectToDB;
