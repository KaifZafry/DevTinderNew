const express = require('express');

const ConnectDB = require("./config/database");
const userModel = require("./model/user");
const { validateSignupData } = require('./utils/validation')
const cookieParser = require('cookie-parser');
const authRouter= require('./routes/auth')
const profileRouter= require('./routes/profile')
const app = express();

// Bodyparser middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRouter);
app.use("/profile",profileRouter)





// delete api user
app.delete("/api/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await userModel.findByIdAndDelete(userId);
    if (!user) return res.status(404).send("User not found");
    res.send("User deleted successfully");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// update api user
app.put("/api/user", async (req, res) => {
  const userId = req.body.userId;
  const newEmail = req.body.emailId;

  try {
    const user = await userModel.findByIdAndUpdate(userId, { emailId: newEmail }, { new: true });
    console.log(user.emailId); // ✅ Will show the updated email
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      res.json({ message: "Email updated successfully", user });
    }

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



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