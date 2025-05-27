const express= require('express');
const userModel = require('../model/user');
const profileRouter= express.Router();

profileRouter.get("/api/NewUsers", async (req, res) => {
    try {
    
      const users = await userModel.find({});
      console.log("All Users:", users);
      res.json(users);
    } catch (err) {
  
      console.error("Error:", err);
  
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = profileRouter();