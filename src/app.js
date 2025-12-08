const express = require('express');

const ConnectDB = require("./config/database");
const cookieParser = require('cookie-parser');
const authRouter= require('./routes/auth');
const profileRouter= require('./routes/profile');
const requestRouter = require('./routes/request');
const app = express();

// Bodyparser middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter)





// Connect to MongoDB
ConnectDB()
  .then(() => {
    console.log("Connecting to MongoDB database is accepted");
    app.listen(5000, () => console.log("Server is running on port 5000"));
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB database:", err.message);
    console.error(err.stack);
  });