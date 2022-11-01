const express = require('express');
const path = require('path');
const dotenv = require('dotenv/config'); // package for .env file
const cors = require('cors');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'happyn3ss',
    database: 'collegeDB'
});
const app = express();
connection.connect();

/**
 * babel: compiles code to vanilla JS under the hood
 *   When using upcoming JS language feature not in Node.js,
 *   can still use the feature in the source code thanks to babel.
 */

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    connection.query('SELECT * FROM student', (err, rows, fields) => {
        if (err) throw err;
        res.render('home', { data: rows });
    })
});

app.listen(process.env.PORT, () => {
    console.log(`Connected at port ${process.env.PORT}...`);
});