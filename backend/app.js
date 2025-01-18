const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth-routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);

module.exports = app; // Export the app for use in server.js
