const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth-routes");
const userRouter = require("./routes/user-routes");
const matchesRouter = require("./routes/matches-routes");
const messagesRouter = require("./routes/message-routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/matches', matchesRouter);
app.use('/api/v1/messages', messagesRouter);

module.exports = app; // Export the app for use in server.js
