const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.shgh1ow.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    client.connect();
      

    const collegeCollection = client.db("collegeDb").collection("college");
    const reviewCollection = client.db("collegeDb").collection("review");
    const researchCollection = client.db("collegeDb").collection("research");
    
    // college collection
      app.get("/college", async (req, res) => {
        const result = await collegeCollection.find().sort({ createdAt: -1 }).toArray();
        res.send(result);
      });
      
      
    //   review collection
      app.get("/review", async (req, res) => {
        const result = await reviewCollection.find().sort({ createdAt: -1 }).toArray();
        res.send(result);
      });

    //   research collection
      app.get("/research", async (req, res) => {
        const result = await researchCollection.find().sort({ createdAt: -1 }).toArray();
        res.send(result);
      });
      
      
      
      
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("college function server is running...");
});

app.listen(port, () => {
  console.log(`college function server in running on port: ${port}`);
});
