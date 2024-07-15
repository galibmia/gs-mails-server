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



        //*********************** Users Data Section********************/
        // Create/Insert section
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollections.insertOne(newUser);
            res.send(result);

        });

        // Get all users
        app.get('/users', async (req, res) => {
            const cursor = usersCollections.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        // Get single user
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersCollections.findOne(query);
            res.send(result);
        });

        // Delete user
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersCollections.deleteOne(query);
            res.send(result);
        });


        // Update User:
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            const { name, email, phone, password, gender, country, status, about } = user;

            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedUser = {
                $set: {
                    name,
                    email,
                    phone,
                    password,
                    gender,
                    country,
                    status,
                    about
                },
            };
            const result = await usersCollections.updateOne(filter, updatedUser, options);
            res.send(result);
        });

        // ************** Groups section ***************//
        // Create/Insert section
        app.post('/groups', async (req, res) => {
            const newGroup = req.body;
            const result = await groupsCollections.insertOne(newGroup);
            res.send(result);
        });

        // Get all groups
        app.get('/groups', async (req, res) => {
            const cursor = groupsCollections.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        // Get single group
        app.get('/groups/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await groupsCollections.findOne(query);
            res.send(result);
        });
        // Delete group
        app.delete('/groups/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await groupsCollections.deleteOne(query);
            res.send(result);
        });

        // Update group
        app.put('/groups/:id', async (req, res) => {
            const id = req.params.id;
            const group = req.body;
            const { groupName, status } = group;

            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedGroup = {
                $set: {
                    groupName,
                    status
                },
            };
            const result = await groupsCollections.updateOne(filter, updatedGroup, options);
            res.send(result);
        });
        //*********************** Contacts Data Section********************/
        // Create/Insert section
        app.post('/contacts', async (req, res) => {
            const newContact = req.body;
            const result = await contactsCollections.insertOne(newContact);
            res.send(result);

        });

        // Get all contacts
        app.get('/contacts', async (req, res) => {
            const cursor = contactsCollections.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        // Get single Contact
        app.get('/contacts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await contactsCollections.findOne(query);
            res.send(result);
        });

        // Delete Contact
        app.delete('/contacts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await contactsCollections.deleteOne(query);
            res.send(result);
        });

        // Update Contact:
        app.put('/contacts/:id', async (req, res) => {
            const id = req.params.id;
            const contact = req.body;
            const { name, email, phone, gender, country, group, status, about } = contact;

            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedContact = {
                $set: {
                    name,
                    email,
                    phone,
                    gender,
                    country,
                    group,
                    status,
                    about
                },
            };
            const result = await contactsCollections.updateOne(filter, updatedContact, options);
            res.send(result);
        });

        // ************** Categories section ***************//
        // Create/Insert section
        app.post('/categories', async (req, res) => {
            const newCategory = req.body;
            const result = await categoriesCollections.insertOne(newCategory);
            res.send(result);
        });

        // Get all categories
        app.get('/categories', async (req, res) => {
            const cursor = categoriesCollections.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        // Get single category
        app.get('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await categoriesCollections.findOne(query);
            res.send(result);
        });
        // Delete category
        app.delete('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await categoriesCollections.deleteOne(query);
            res.send(result);
        });

        // Update category
        app.put('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const category = req.body;
            const { categoryName, status } = category;

            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedCategory = {
                $set: {
                    categoryName,
                    status
                },
            };
            const result = await categoriesCollections.updateOne(filter, updatedCategory, options);
            res.send(result);
        });




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