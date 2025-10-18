// Import mongoose and dotenv to load environment variables
const mongoose = require("mongoose");
require("dotenv").config(); // Load variables from .env

// Connect to MongoDB using the URI stored in .env
mongoose.connect(process.env.MONGODB_URI)

// If the connection is successful, log a confirmation message
.then(() => {
  console.log("MongoDB connected successfully");
})

// If the connection fails, catch the error and log it to the console
.catch((error) => {
  console.error("MongoDB connection failed:", error.message);
});


// =============================
// Define a User Schema
// =============================
// A schema defines the structure and data types of a MongoDB collection (like a table in SQL)
const userSchema = new mongoose.Schema({
  name: {
    type: String,     // User’s full name
    required: true    // Field must be provided when creating a user
  },
  email: {
    type: String,     // User’s email address (used for login)
    required: true,
    unique: true      // No two users can have the same email
  },
  password: {
    type: String,     // Hashed password stored securely
    required: true
  }
});


// Create a collection (model) from the schema
// "User" becomes the collection name (Mongoose will pluralize it to "users")
const userCollection = mongoose.model("User", userSchema);


// Export the model so other files (like server.js) can import it and interact with the database
module.exports = userCollection;
