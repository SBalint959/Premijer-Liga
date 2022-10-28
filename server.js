var bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg');
const db = require('./db')

const indexRouter = require('./routes/index.routes');
const datatableRouter = require('./routes/datatable.routes');
//const apiRouter = require('./routes/api.routes');

const { pool } = require('./db');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/datatable', datatableRouter);
//app.use('/api/v1/departments', apiRouter);

app.listen(3000);