const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../model/connectionRequest");
const userRouter = express.Router();

const USER_SAFE_DATA= "firstName lastName gender age photoURL about skills "

userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await connectionRequestModel
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate(
        "fromUserId",
        USER_SAFE_DATA
      );

    res.json({
      message: "Connection Request fetched successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await connectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate(
        "fromUserId",
        USER_SAFE_DATA
      ).populate("toUserId", USER_SAFE_DATA);

    const data= connectionRequest.map((row)=>{

        if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
            return row.toUserId
        }
        return row.fromUserId

    });

    res.send({message:"Data fetched successfully", data})

  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = userRouter;
