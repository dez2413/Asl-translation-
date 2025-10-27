require("dotenv").config();       // Load environment variables from .env file

// Importing dependencies
const express = require("express");           // Express is the framework for creating backend APIs
const collection = require("./mongo");        // Importing the MongoDB user collection (from mongo.js)
const cors = require("cors");                 // CORS allows frontend (React) and backend to communicate
const app = express();                        // Initialize Express app

const OpenAI = require("openai");               // OpenAI SDK for AI content generation
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // OpenAI API client

// Middleware setup
app.use(express.json());                      // Parse incoming JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors());                              // Enable Cross-Origin Resource Sharing for all routes

// Define port (React usually runs on 3000, so backend uses 5000)
const PORT = 5000;

// ------------------------------
// Example GET route (Test endpoint)
// ------------------------------
// Returns a small JSON response to verify that the backend is running correctly
app.get('/', cors(), (req, res) => {
  res.json([
    { id: 1, title: "ASL Alphabet - A", image: "a.png" },
    { id: 2, title: "ASL Alphabet - B", image: "b.png" }
  ]);
});


// ------------------------------
// POST /login  --> Handles user login
// ------------------------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;       // Extract email and password from the request body

  try {
    const user = await collection.findOne({ email }); // Find user by email in MongoDB

    if (!user) {
      // If user does not exist, send "notexist"
      return res.json("notexist");
    }

    // Compare password (currently plain text; should be hashed for production)
    if (user.password !== password) {
      return res.json("wrongpassword");
    }

    // If email and password match, confirm successful login
    res.json("exist");
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json("error");
  }
});


// ------------------------------
// GET /login --> Optional route placeholder (currently unused)
// ------------------------------
app.get("/login", cors(), (req, res) => {
  // You could render a view or send a message here if needed
});


// ------------------------------
// POST /signUp --> Creates a new user account
// ------------------------------
app.post("/signUp", async (req, res) => {
  const { name, email, password } = req.body;   // Extract user input
  const data = { name, email, password };

  try {
    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.json("exist");
    }

    // Insert new user into the database
    await collection.insertOne(data);
    return res.json("notexist");
  } catch (e) {
    console.error("Signup error:", e);
    return res.status(500).json("error");
  }
});


// ------------------------------
// POST /account --> Placeholder for future account management
// ------------------------------
// This route will handle user profile updates or password changes later.
app.post("/account", async (req, res) => {
  // TODO: Implement logic for updating or deleting account info
  // e.g., Update name, email, or password in the database


// export default Sign;
//   const { name, email, password } = req.body;

//   try {
//     const user = await collection.findAndModify({ 
//       query:{$and[
//         {email: email}
//         {password: password}
//         ]}
//         update:{$set[
//         name: name
//         email: email
//         password: password]})
//  } catch (e) {
//    console.error("Update error:", e);
//    return res.status(500).json("error");
//  }

});

app.post("/generate", async (req, res) => {
  try {
    const { term } = req.body;

    // --- Generate textual explanation ---
    const explanation = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an ASL instructor who explains hand signs clearly.",
        },
        {
          role: "user",
          content: `Explain how to sign the letter '${term}' in American Sign Language in one short paragraph.`,
        },
      ],
    });

    let imageUrl;

    try {
      // --- Generate the diagram image for the ASL letter ---
      const image = await openai.images.generate({
        model: "gpt-image-1",
        prompt: `A clear, simple line drawing of a hand showing the American Sign Language sign for the letter '${term}'. 
                 Show just the handshape and orientation, no text or background.`,
        size: "1024x1024",
      });

      imageUrl = image.data[0].url;
    } catch (imgError) {
      console.warn("⚠️ Image model unavailable — using fallback image.");

      // --- Fallback: use a local or online placeholder letter image ---
      imageUrl = `/asl_letters/${term.toUpperCase()}.png`; // e.g. /public/asl_letters/A.png
    }

    res.json({
      term,
      explanation: explanation.choices[0].message.content,
      imageUrl,
    });
  } catch (error) {
    console.error("Error in /generate:", error);

    // --- If the whole thing fails, still return something to the frontend ---
    res.status(500).json({
      term: req.body.term,
      explanation: `The ASL sign for '${req.body.term}' is made using a specific handshape.`,
      imageUrl: "https://via.placeholder.com/1024x1024?text=ASL+Sign",
    });
  }
});


// ------------------------------
// Start the server
// ------------------------------
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

// Testing Git Push (safe to remove later)
