var bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg');
const db = require('./db')

const indexRouter = require('./routes/index.routes');
const datatableRouter = require('./routes/datatable.routes');

const { pool } = require('./db');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/datatable', datatableRouter);

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 8080;

if (externalUrl) {
    const hostname = '127.0.0.1';
    app.listen(port, hostname, () => {
        console.log(`Server locally running at http://${hostname}:${port}/ and from outside on ${externalUrl}`);
    });
}
else {
    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
    });

}