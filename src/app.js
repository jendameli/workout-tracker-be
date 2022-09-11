// Access to .env file
require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

// Init express app
const app = express();

// Middlewares
app.use(helmet());
app.use(morgan("dev"));

module.exports = app;
