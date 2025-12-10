const validator = require('validator');
const validateSignupData= (req)=>{
const {firstName, lastName,emailId, password}= req.body;
if (!firstName || !lastName){
    throw new Error ("please enter first name and last name")
}
else if (!emailId || !password){
    throw new Error ("please enter emailId and password")
}
else if(! validator.isEmail(emailId)){
    throw new Error ("please enter a valid email")
}
else if(! validator.isStrongPassword(password)){
    throw new Error ("please enter a strong password")
}
}

const validateEditProfiledata = (req)=>{
    
    const allowedfields= ["firstName", "lastName","gender","emailId","age","about","skills", "photoURL"]

   const isallowedfieds= Object.keys(req.body).every((field)=>{
    return allowedfields.includes(field)
    });

    return isallowedfieds
}

module.exports = {validateSignupData, validateEditProfiledata}
