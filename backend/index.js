const mongoose = require('mongoose')

const connectDB = async() =>{
  try{
    await mongoose.connect("mongodb+srv://COMP1640:COMP1640group5@cluster0.kgdq0tl.mongodb.net/COMP1640?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Connected db");
  } catch (error){
    console.log("not connected");
  }
}
connectDB()
module.exports = connectDB;