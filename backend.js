const express= require('express');

const hostname='127.0.0.1';
const port = 3220;
const cors=require('cors');

//create an express application
var app = express();
app.use(cors({}))
app.use(express.json());

//define a route handler for GET requests to '/details'
app.get('/details',(req,res)=>{
    console.log('request query parametrs',req.query);
    res.send('recieved your request');
});

app.get('/add', (req, res) => {
    var num1 = parseInt(req.query.num1);
    var num2 = parseInt(req.query.num2);

    var sum=num1+num2;
        res.send('The sum of ${num1} and ${num2} is ${sum}');
    } 
);


app.post('/add2',(req,res)=>{
    const { num1, num2, numbers } = req.body;
    if (num1 !== undefined && num2 !== undefined && Array.isArray(numbers)) {
        const sum = num1 + num2;
        const largestNumber = Math.max(...numbers);
        res.json({ sum, largestNumber });
    } else {
        res.status(400).s({ error: 'Invalid data. Please provide num1, num2, and an array of numbers.' });
    }
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    res.json({ username, password });
});


app.listen(port,hostname,()=>{
    console.log('Server running at http://' + hostname + ':' + port);
});