const jwt = require("jsonwebtoken");
const User= require("../model/user")

const userAuth = async (req,res,next)=>{
    try{
        const {token}= req.cookies;
        if(!token){
            throw new Error("token not found!")
        }
        const decodeObj = await jwt.verify(token, process.env.JWT_SECRETCODE);
        const{_id}= decodeObj;
        const user= User.findById(_id);
        if(!user){
            throw new Error("user not found")
        }
        next()
    }
    catch(err){
        res.status(400).send("error:" + err.message)
    }
}

module.exports = {userAuth};