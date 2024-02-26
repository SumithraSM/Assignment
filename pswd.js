const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(cors({}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToDatabase();
const usersCollection = client.db('Authenticationdb').collection('Loginpg');
const itemslist = client.db('Authenticationdb').collection('display');
const description = client.db('Authenticationdb').collection('description');
   
    app.post('/login', async (req, res) => {
        const { username, password } = req.body;
        
        const user = await usersCollection.findOne({ username, password });

        if (user) {
        console.info("user=====>",user)
            
            res.send({ status:200, success: true, message: 'Login successful',user });
        } else {
           
            res.status(401).send({ error: 'Invalid credentials' });
        }
    });

    app.get('/list', async (req, res) => {
       
        const items = await itemslist.find({}).toArray();
        console.log("DDDDDD",items);

        if (items && Array.isArray(items) && items.length>0) {
            res.send({ status:200, success: true, message: 'Login successful',items});
        } else {
           
            res.status(401).send({ error: 'No users found' });
        }
    });
    app.get('/description', async (req, res) => {
       
        const description = await itemslist.find({}).toArray();
        console.log("DDDDDD",description);

        if (description && Array.isArray() && description.length>0) {
            res.send({ status:200, success: true, message: 'Login successful',items});
        } else {
           
            res.status(401).send({ error: 'No users found' });
        }
    });
    app.put('/update/:itemId', async (req, res) => {
        try {
            const itemId = req.params.itemId;
            const updatedDetails = req.body;
    
            const result = await itemslist.updateOne(
                { itemId: itemId },
                { $set: updatedDetails }
            );
    
            if (result.matchedCount > 0) {
                res.status(200).send({ success: true, message: 'Item updated successfully' });
            } else {
                res.status(404).send({ error: 'Item not found' });
            }
        } catch (error) {
            console.error('Error updating item:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
    
    // app.get('/list', async (req, res) => {
       
        
    //     const users = await usersCollection.find({}).toArray();

    //     if (users && Array.isArray(users) && users.length>0) {
    //         res.send({ status:200, success: true, message: 'Login successful',users });
    //     } else {
           
    //         res.status(401).send({ error: 'No users found' });
    //     }
    // });
    
    
    
    
    


    const hostname = '127.0.0.1';
    const port=3000;
    app.listen(port, hostname, () => {
        console.info(`Server running at http://${hostname}:${port}/`);
    });