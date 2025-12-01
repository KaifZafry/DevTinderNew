const express = require('express');
const userModel = require('../model/user');
const profileRouter = express.Router();
const jwt = require('jsonwebtoken');
const { userAuth } = require('../middlewares/auth')



profileRouter.get("/api/NewUsers", userAuth, async (req, res) => {
  try {

    const cookies = req.cookies;

    const { token } = cookies;
    const decodeMessage = await jwt.verify(token, "DEV@Tinder$790")
    console.log(decodeMessage);

    const { _id } = decodeMessage;
    console.log("Logged in User is" + _id)

    const users = await userModel.find({});
    console.log("All Users:", users);
    res.json(users);
  } catch (err) {

    console.error("Error:", err);

    res.status(500).json({ error: "Internal Server Error" });
  }
});

profileRouter.post("/sentConnectionRequest", userAuth, (req, res) => {
    const user = req.user;
    res.send(user._id + " sent a connection request");
});

module.exports = profileRouter;