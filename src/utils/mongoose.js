const mongoose = require('mongoose');
 
require("dotenv").config({ path: ".env" })
  

const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('db connected!');
};

module.exports = connectDB;
 
  
 