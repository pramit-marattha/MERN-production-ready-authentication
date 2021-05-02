const express = require("express");

require("dotenv").config({ path: "./configuration.env" });

const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Currently server is running at port ${PORT}`);
});
