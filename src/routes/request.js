const express = require('express');
const { userAuth } = require('../middlewares/auth');

const requestRouter= express.Router();

requestRouter.post('/sendConnectionRequest',userAuth, (req,res)=>{
    const user= req.body;
    console.log('sending a connection request')
    res.send(user + 'sent a connection request')
})

module.exports = requestRouter