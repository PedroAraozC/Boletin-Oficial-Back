const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const moment = require("moment-timezone");
moment.tz.setDefault("America/Argentina/Buenos_Aires");
require("./relations");
const connectDB = require("./config/dbMongo");
const boletinRoutes = require("./routes/boletinRoutes");
const normaRoutes = require("./routes/normaRoutes")
const origenRoutes = require("./routes/origenRoutes.js")

const app = express();
app.use(cors());
dotenv.config();
connectDB();

const PORT = process.env.PORT;

// mongoose.connect(process.env.DB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/boletin", boletinRoutes);
app.use("/norma", normaRoutes);
app.use("/origen", origenRoutes);
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
