const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;

// mongodb+srv://Gabi-user:12345gabiuser@cluster0.cwtwge6.mongodb.net/BoletinOficial?retryWrites=true&w=majority