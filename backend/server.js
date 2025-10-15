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





app.post("/account", async (req, res) => { //Work in Progress. Need to implement updating info for account.
  // return (
//     <div className="container">
//       <div className="header">
//         <div className ="text"> Sign Up</div>
//         <div className="Underline"></div>
//       </div>
//       <form onSubmit={submit}>
//         <div className="inputs">
//           <div className="input">
//             <img src={user_icon} alt="" />
//             <input
//               type="text"
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Name"
//             />
//           </div>
//           <div className="input">
//             <img src={email_icon} alt="" />
//             <input
//               type="email"
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//             />
//           </div>
//           <div className="input">
//             <img src={password_icon} alt="" />
//             <input
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//             />
//           </div>
//         </div>
//         <button type="submit" className="submit">
//           Submit
//         </button>
//       </form>
//       <div className= "switch"> Do have an account? <Link to="/login">Login</Link>
//       </div>
//     </div>
//   );
// }

// export default Sign;
//   return (
//     <div className="container">
//       <div className="header">
//         <div className ="text"> Sign Up</div>
//         <div className="Underline"></div>
//       </div>
//       <form onSubmit={submit}>
//         <div className="inputs">
//           <div className="input">
//             <img src={user_icon} alt="" />
//             <input
//               type="text"
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Name"
//             />
//           </div>
//           <div className="input">
//             <img src={email_icon} alt="" />
//             <input
//               type="email"
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//             />
//           </div>
//           <div className="input">
//             <img src={password_icon} alt="" />
//             <input
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//             />
//           </div>
//         </div>
//         <button type="submit" className="submit">
//           Submit
//         </button>
//       </form>
//       <div className= "switch"> Do have an account? <Link to="/login">Login</Link>
//       </div>
//     </div>
//   );
// }

// export default Sign;
//   const { name, email, password } = req.body;

//   try {
//     const user = await collection.findOne({ email }); //

//     //change if user exist
//     if (!user) {
//       return res.json("notexist");
//     }

//     // verify password match
//     if (user.password !== password) {
//       return res.json("wrongpassword");
//     }

//     res.json("exist");
//   } catch (e) {
//     console.error("Login error:", e);
//     res.status(500).json("error");
//   }
 });


app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

//Testing Git Push
