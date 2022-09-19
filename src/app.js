// Access to .env file
require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const userRouter = require("./components/user/userRouter");
const { authentificate } = require("./middleware/authentification");

// Init express app
const app = express();

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Routers
app.use("/user", userRouter);

module.exports = app;
