const mongoose = require('mongoose');
require('dotenv').config();

const ConnectDB= async ()=>{ 
   
   // await mongoose.connect('mongodb+srv://kaifzafry3110:ZMYhhrjDfwxABgSk@namastenode.t42j3.mongodb.net/DevTinder')
   //await mongoose.connect('mongodb+srv://kaifzafry3110:Zafrykaif@namastenode.t42j3.mongodb.net/DevTinder')
   await mongoose.connect(process.env.MONGODB_URI, {
     
    }).then(() => {
      console.log('Connected to MongoDB');
    }).catch((error) => {
      console.error('Connection error:', error);
    });
}
mongoose.set('debug', true);


module.exports = ConnectDB;


