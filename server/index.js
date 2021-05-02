const express = require("express");

require("dotenv").config({ path: "./configuration.env" });

const redirect = require("./routes/auth.js");

const app = express();

// middleware that allow us to get the data from the body
app.use(express.json());

app.use("/api/auth", redirect);



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Currently server is running at port ${PORT}`);
});
