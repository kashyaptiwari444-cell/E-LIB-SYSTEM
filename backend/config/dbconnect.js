const mongoose = require("mongoose");

mongoose.set("strictQuery", false); // or true (your choice)

let connectDB = () =>{
    mongoose.connect('mongodb://127.0.0.1:27017/elibrary')
    .then(()=>console.log('Database connected '))
    .catch((err)=>console.log('Database Error:'+err))
}
module.exports = connectDB