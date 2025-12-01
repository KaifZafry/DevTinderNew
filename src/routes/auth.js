const express = require('express')
const userModel= require('../model/user')
const authRouter = express.Router();
const {validateSignupData}= require('../utils/validation')
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
require('dotenv').config();

//signup api code starts from here
authRouter.post("/register", async (req, res) => {
    try {
      const { firstName, lastName, emailId, password, gender } = req.body;
  
      // Validate request data
      validateSignupData(req);
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create and save user
      const newUser = new userModel({ firstName, lastName, emailId, password: hashedPassword, gender });
      await newUser.save();
      console.log("User saved successfully", newUser);
  
      res.status(201).send("User added successfully");
    } catch (error) {
      console.error("Error:", error.message);
      res.status(400).send("Error: " + error.message);
    }
  });

  //signup api code ends here


  //*****************************************************************//

  //login api code starts from here

  authRouter.post("/login", async (req, res) => {
    const { emailId, password } = req.body;
  
    try {
      const user = await userModel.findOne({ emailId });
      if (!user) return res.status(404).send({ message: "User not found" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
  
        // Generate and send JWT token
        const token= await jwt.sign({_id: user._id}, process.env.JWT_SECRETCODE)
        console.log(token);
        res.cookie('token', token)
        
        res.send({ message: "Login successful", user });
      } else {
        res.status(400).send({ message: "Invalid password" });
      }
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });

  //login api code ends here

  //logout api code starts from here
  authRouter.post("/logout", (req, res) => {
    res.clearCookie('token');
    res.send({ message: "Logged out successfully" });
  });

  // logout api code ends here

module.exports = authRouter;