// Access to .env file
require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const exerciseRouter = require("./components/exercise/exerciseRouter");
const userRouter = require("./components/user/userRouter");
const workoutRouter = require("./components/workout/workoutRouter");

// Init express app
const app = express();

// Middlewares
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(cookieParser());

// Routers
app.use("/user", userRouter);
app.use("/workout", workoutRouter);
app.use("/exercise", exerciseRouter);

module.exports = app;
