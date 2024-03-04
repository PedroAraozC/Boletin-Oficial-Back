const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB connected");
    console.log("Larry The Bird connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;

// mongodb+srv://pedroaraozc:9ktQpA2IRDwmGJuv@cluster0.m4jnmsh.mongodb.net/boletin-oficial?retryWrites=true&w=majority
