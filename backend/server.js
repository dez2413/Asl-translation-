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

app.post("/login",async(req,res)=>{
  const{email, password}  =req.body

  try{
    const check = await collection.findOne({email: email});

    if(check){
      res.json("exist")
    } else{ 
      res.json("notexist")
    }    
  } catch(e){
    res.json("notexist");
  }
})

app.post("/signUp", async (req, res) => {
  const { name, email, password } = req.body;
  const data = { name, email, password };

  try {
    const existingUser = await collection.findOne({ email });

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

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

//Testing Git Push