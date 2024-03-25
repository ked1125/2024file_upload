const express = require("express");
const app = express();
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const server = function () {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("db연결완료");
    app.use(express.json());
  } catch (error) {
    console.log("db연결실패");
  }
};

app.listen(3000);
server();
