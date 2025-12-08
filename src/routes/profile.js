const express = require('express');
const userModel = require('../model/user');
const profileRouter = express.Router();
const jwt = require('jsonwebtoken');
const { userAuth } = require('../middlewares/auth');
require('dotenv').config();



//api for get the user details
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {

    const cookies = req.cookies;

    const { token } = cookies;
    const decodeMessage = await jwt.verify(token, process.env.JWT_SECRETCODE)
    console.log(decodeMessage);

    const { _id } = decodeMessage;
    console.log("Logged in User is" + _id)

    const users = await userModel.find({_id});
    console.log("the logged in user is ", users);
    res.json(users);
  } catch (err) {

    console.error("Error:", err);

    res.status(500).json({ error: "Internal Server Error" });
  }
});


// api for update profile
profileRouter.patch('/profile/edit',userAuth, async (req,res)=>{
  try{
  const loggedInUser= req.user;

  Object.keys(req.body).forEach((key)=> (loggedInUser[key]=req.body[key]))

  await loggedInUser.save();

  res.json({message:`${loggedInUser.firstName}, your profile is updated succesfully`, data:loggedInUser})
  }
  catch(err){
    res.status(400).send('Error :'+ err.message)
  }



})






//api for delete user
profileRouter.delete("/api/user", async (req, res) => {
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
profileRouter.put("/api/user", async (req, res) => {
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

module.exports = profileRouter;