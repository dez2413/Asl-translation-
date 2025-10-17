const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
const PORT = 5000; // use 5000 for backend, 3000 will be React frontend

// Example API endpoint
app.get('/',cors(),(req, res) => {
  res.json([
    { id: 1, title: "ASL Alphabet - A", image: "a.png" },
    { id: 2, title: "ASL Alphabet - B", image: "b.png" }
  ]);
});


//
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({ email }); //getting email

    //change if user exist
    if (!user) {
      return res.json("notexist");
    }

    // verify password match
    if (user.password !== password) {
      return res.json("wrongpassword");
    }

    res.json("exist");
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json("error");
  }
});

//get the login page
app.get("/login",cors(),(req, res) => {
 
  })

//post all the sign to the database
app.post("/signUp", async (req, res) => {
  const { name, email, password } = req.body;
  const data = { name, email, password };

  try {
    const existingUser = await collection.findOne({ email });

    //changing if user exist
    if (existingUser) {
      return res.json("exist");
    }

    await collection.insertOne(data); 
    return res.json("notexist"); 
  } catch (e) {
    console.error("Signup error:", e);
    return res.status(500).json("error");
  }
});





//app.post("/account", async (req, res) => { //Work in Progress. Need to implement updating info for account.

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
// });


app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

//Testing Git Push
