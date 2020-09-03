const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    console.log('GET Request Received');
    res.status(200).send({
        quote: getRandomElement(quotes)
    });
});

app.get('/api/quotes', (req, res, next) => {
    const queryPerson = req.query.person;
    if (queryPerson) {
        const filterQuotes = quotes.filter(quote => {
            return quote.person === queryPerson;
        });
        res.status(200).send({ quotes: filterQuotes });
    } else {
        res.status(200).send({ quotes: quotes });
    }
});

app.post('/api/quotes', (req, res, next) => {
    if (req.query.person && req.query.quote) {
        let addQuote = { quote: req.query.quote, person: req.query.person };
        quotes.push(addQuote);
        res.status(201).send({ quote: addQuote });
      } else {
        res.status(404).send('Sorry, cant enter that');
      }
});

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});