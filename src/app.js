// Access to .env file
require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const userRouter = require("./components/user/userRouter");

// Init express app
const app = express();

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routers
app.use("/user", userRouter);

module.exports = app;
