require('dotenv').config();
const cors = require('cors')
const express = require('express');
const app = express();
const port = 8080;
const routes = require('./routes');
require('./config/dbConfig');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);



app.listen(port, () => {
    console.log('Servidor funcionando');
})