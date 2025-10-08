const mongoose =require("mongoose");
mongoose.connect("mongodb+srv://jubjub632_db_user:MAxn3eRWMDwmR4o@asldatabase.9sn35at.mongodb.net/?retryWrites=true&w=majority&appName=ASLDatabase")



.then(()=>{
    console.log("mongodb connected");
})
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
})

// collection schema for users
const userSchema=new mongoose.Schema({
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
