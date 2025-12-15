const express = require('express');
const { userAuth } = require('../middlewares/auth');
const connectionRequestModel = require('../model/connectionRequest');
const User = require('../model/user')

const requestRouter = express.Router();

requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {

    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId
        const status = req.params.status




        //user allowed only to interested and ignored status 
        const allowedStatus = ["interested", "ignored"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).send("Invalid Status Type" + status);
        }

        //condition to check for a random userId

        const toUser = await User.findById(toUserId);

        if (!toUser) {
            res.status(404).send("User Not Found")
        }

        //user can only send one request to one user duplication is not allowed
        const existingRequest = await connectionRequestModel.findOne({
            $or: [
            { fromUserId, toUserId },
            { fromUserId: toUserId, toUserId: fromUserId }
            ]

        })

        if (existingRequest) {
            return res.status(400).send({ message: 'You have already sent a connection request to this user' })
        }


        //send the data connectionrequest

        const connectionRequest = connectionRequestModel({
            fromUserId,
            toUserId,
            status
        })
        const data = await connectionRequest.save();

        res.json({
            message: 'Connection Sent Successfully',
            data
        })
    }
    catch (err) {
        res.status(400).send("Error:" + err.message)
    }

})

module.exports = requestRouter