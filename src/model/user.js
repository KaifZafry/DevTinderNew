const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
require ('dotenv').config();
const validator = require('validator')
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
    about:{
        type: String,
        default: "This is the default about the user"
    },
    photoURL:{
        type: String,
        default: "https://avatars.githubusercontent.com/u/106135175?v=4",
        validate(value){
            if(!validator.isURL(value)){
                throw new error ('Invalid photoURL'+ value)
            }
        }
    }
  
});

userSchema.index({emailId:1})
userSchema.index({firstName:1, lastName:1})

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
