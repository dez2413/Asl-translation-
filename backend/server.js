/**
 * backend/server.js
 * -----------------
 * Simple Express backend used by the ASL translation app.
 *
 * Responsibilities:
 * - Exposes small API endpoints used by the React client for login, signup,
 *   and basic account management.
 * - Uses the `collection` exported from `mongo.js` (a MongoDB collection wrapper)
 *   to perform simple user CRUD operations.
 *
 * Contract / Response shape (summary):
 * - POST /login  -> returns one of: "notexist", "wrongpassword", "exist" or "error"
 * - POST /signUp -> returns "exist", "notexist" or "error"
 * - /account routes -> return strings like "updated", "deleted", "notfound" or an error
 *
 * Notes and TODOs:
 * - Passwords are stored and compared in plaintext in this demo. Do NOT use
 *   this approach in production: hash passwords using bcrypt (or similar) and
 *   validate inputs properly.
 * - Consider adding authentication (JWT or sessions) for protected routes.
 * - The PORT can be configured via the PORT environment variable.
 *
 * Inputs: JSON request bodies for POST routes (login, signUp, account updates).
 * Outputs: JSON strings or small objects (see above). Errors return HTTP 500.
 */

// Importing dependencies
const express = require("express");           // Express is the framework for creating backend APIs
const collection = require("./mongo");        // Importing the MongoDB user collection (from mongo.js)
const cors = require("cors");                 // CORS allows frontend (React) and backend to communicate
const app = express();                        // Initialize Express app

// Middleware setup
app.use(express.json());                      // Parse incoming JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors());                              // Enable Cross-Origin Resource Sharing for all routes

// Define port: allow override with environment variable for deployment flexibility.
// Example: PORT=8080 node server.js
const PORT = process.env.PORT || 5000;

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
  const { email, password, newName, newEmail, newPassword } = req.body;

  try {
    // Find user by old email + password
    const user = await collection.findOne({ email, password });

    if (!user) {
      return res.json("notexist");
    }

    const updatedUser = await collection.findOneAndUpdate(
      { email, password },
      {
        $set: {
          name: newName || user.name,
          email: newEmail || user.email,
          password: newPassword || user.password
        }
      },
      { new: true }
    );

    return res.json({
      status: "updated",
      updatedUser
    });

  } catch (e) {
    console.error("Update error:", e);
    return res.status(500).json("error");
  }
});


app.post("/account/update", async (req, res) => {
  const { email, password, newName, newEmail, newPassword } = req.body;

  try {
    const user = await collection.findOne({ email, password });

    if (!user) return res.json("notfound");

    await collection.updateOne(
      { email, password },
      {
        $set: {
          name: newName || user.name,
          email: newEmail || user.email,
          password: newPassword || user.password
        }
      }
    );

    return res.json("updated");
  } catch (err) {
    console.error(err);
    return res.status(500).json("error");
  }
});

//

app.post("/account/delete", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({ email, password });
    if (!user) return res.json("notfound");

    await collection.deleteOne({ email, password });
    return res.json("deleted");
  } catch (err) {
    console.error(err);
    res.status(500).json("error");
  }
});




// ------------------------------
// Start the server
// ------------------------------
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

// Testing Git Push (safe to remove later)
