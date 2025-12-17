const express = require('express');
const { userAuth } = require('../middlewares/auth');
const connectionRequestModel = require('../model/connectionRequest');
const userRouter= express.Router();

userRouter.get('/user/requests',userAuth, async (req,res)=>{
   try{
    const loggedInUser= req.user;

    const connectionRequest = await connectionRequestModel.find({
        toUserId: loggedInUser._id,
        status: 'interested'
    }).populate('fromUserId', 'firstName lastName gender age photoURL about skills ')

    res.json({
        message: 'Connection Request fetched successfully',
        data: connectionRequest
    })
   }
   catch(err){
    res.status(400).send('Error :'+ err.message)
   }
})


module.exports = userRouter;