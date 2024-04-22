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
const normaRoutes = require("./routes/normaRoutes");
const origenRoutes = require("./routes/origenRoutes.js");
const path = require("path");
const userRoutes = require("./routes/userRoutes.js");
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// mongoose.connect(process.env.DB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

app.use("/boletin", boletinRoutes);
app.use("/norma", normaRoutes);
app.use("/origen", origenRoutes);
app.use("/usuarios", userRoutes);
// const staticPath = "/var/www/html";
// app.use(express.static(staticPath));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(staticPath, "index.html"));
// });

// app.use(express.static("/var/www/html/assets"));
// app.get("*", (req, res) => {
//   res.sendFile(path.join("/var/www/html/assets", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
