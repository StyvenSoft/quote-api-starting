const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});

app.get('/api/quotes/random', (req, res, next) => {
    console.log('GET Request Received');
    res.status(200).send({
        quote: getRandomElement(quotes)
    });
});