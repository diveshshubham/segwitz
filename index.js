//express server
const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => 
{
  res.json({message: "API for adding sales data"});
});

const route = require('./routes/router')(app);

app.listen(8082);

console.log("Listening to PORT 8082");