
const { MongoClient, ServerApiVersion } = require('mongodb'); //I have the password. We'll need to figure out how to keep this secure when we actually get this going.
const uri = "mongodb+srv://jubjub632_db_user:<db_password>@asldatabase.9sn35at.mongodb.net/?retryWrites=true&w=majority&appName=ASLDatabase";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
