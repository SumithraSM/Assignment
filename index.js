const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/details', (req, res) => {
    const { number1, number2, numbers } = req.body;

    if (!isNaN(number1) && !isNaN(number2) && Array.isArray(numbers)) {
        const sum = parseFloat(number1) + parseFloat(number2);
        const largestNumber = Math.max(...numbers.map(num => parseFloat(num)));

        res.json({ sum, largestNumber });
    } else {
        res.status(400).send('Please provide valid numbers and/or an array of numbers.');
    }
});

app.listen(port, hostname, () => {
    console.info(`Server running at http://${hostname}:${port}/`);
});
