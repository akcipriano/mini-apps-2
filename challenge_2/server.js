const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

app.get('/historicaldata', (req, res) => {
  request('https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-06-01&end=2019-06-30', (error, response, body) =>{
    if (error) {console.error('BPI error:', error);}
    res.status(200).send(body);
  })
});

app.listen(port, console.log(`Listening on port ${port}`));

