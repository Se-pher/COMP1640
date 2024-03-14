const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const loginRoute = require('./authen/login');
const app = express();
const port = 5000;

const connectDB = async() =>{
  try{
    await mongoose.connect("mongodb+srv://COMP1640:COMP1640group5@cluster0.kgdq0tl.mongodb.net/COMP1640?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Connected db");
  } catch (error){
    console.log("not connected");
  }
}
app.use(bodyParser.json());
app.use('/api', loginRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
connectDB()
module.exports = connectDB;

