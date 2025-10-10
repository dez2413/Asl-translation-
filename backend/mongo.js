const mongoose =require("mongoose");
mongoose.connect("mongodb+srv://jubjub632_db_user:4GHp8Eo7YUPss6Jl@asldatabse.8u0ou61.mongodb.net/?retryWrites=true&w=majority&appName=ASLDatabse")



.then(()=>{
    console.log("mongodb connected");
})
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
})

// collection schema for users
const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:false
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
});

const userCollection = mongoose.model("User", userSchema);

module.exports = userCollection
