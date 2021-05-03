require("dotenv").config({ path: "./configuration.env" });

const express = require("express");

const redirect = require("./routes/auth.js");
const privateRouteRedirect = require("./routes/privateRoute.js");

const errorResponse = require("./middleware/error.js");

const app = express();

const connectDatabase = require("./config/databaseConfig.js");

// Database connection
connectDatabase();

// middleware that allow us to get the data from the body
app.use(express.json());

app.use("/api/auth", redirect);
app.use("/api/private-route", privateRouteRedirect);

// Error Handler
app.use(errorResponse);

const PORT = process.env.PORT || 4000;

const serverListeningPort = app.listen(PORT, () => {
  console.log(`Currently server is running at port ${PORT}`);
});

process.on("unhandeledRejection", (err, promise) => {
  console.log(`Error : ${err}`);
  serverListeningPort.close(() => process.exit(1));
});
