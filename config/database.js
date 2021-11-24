//exporting datbase configuration and connection
const posgres = require('pg');
require("dotenv").config();

const connection = posgres.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    port: process.env.PORT,
    host: process.env.HOST,
});

connection.connect(function (err) {
    if (err) { console.log(err); }
    else {
        console.log("connected to database");
    }
});

module.exports = connection;