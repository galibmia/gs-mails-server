const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

// Middleware

app.use(cors());
app.use(express.json());

// mail_admin
// gvOWvL8cpJKf5iKJ

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.jedysg5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

        const database = client.db("mailDB");
        const usersCollections = database.collection("users_DB");
        const groupsCollections = database.collection("groups_DB");
        const contactsCollections = database.collection("contacts_DB");
        const categoriesCollections = database.collection("categories_DB");
        const templatesCollections = database.collection("templates_DB");



        // Users Data Section

        // Create section
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollections.insertOne(newUser);
            res.send(result);

        });

        // Get all users
        app.get('/users', async(req, res) => {
            const cursor = usersCollections.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        // Get single user
        app.get('/users/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const result = await usersCollections.findOne(query);
            res.send(result);
        });
        // Update user
        app.delete('/users/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const result = await usersCollections.deleteOne(query);
            res.send(result);
        })




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Mail server is running')
})



app.listen(port, () => {
    console.log(`Mail server is running on port ${port}`)
})