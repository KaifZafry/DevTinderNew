const express = require('express');
const { userAuth } = require('../middlewares/auth');
const connectionRequestModel = require('../model/connectionRequest');

const requestRouter= express.Router();

requestRouter.post('/request/send/interested/:toUserId',userAuth, async(req,res)=>{

    try{
 const fromUserId= req.user._id;
    const toUserId= req.params.toUserId
    const status= req.params.toUserId

    const connectionRequest = connectionRequestModel({
        fromUserId,
        toUserId,
        status
    })
    const data= await connectionRequest.save();
    
    res.json({
        message: 'Connection Sent Successfully',
        data
    })
    }
    catch(err){
        res.status(400).send("Error:" + err.message)
    }
   
})

module.exports = requestRouter