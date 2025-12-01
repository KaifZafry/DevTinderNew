const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
