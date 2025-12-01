const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
require ('dotenv').config;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 200
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
  
});

userSchema.methods.getJWT = function (){
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRETCODE)
        console.log(token);
        
    return token;  
}

userSchema.methods.validatePassword = function(inputPassword){
    const user = this;
    const hashedPassword= user.password;
    
    const isPasswordValid= bcrypt.compare(inputPassword, hashedPassword)

    return isPasswordValid;
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
