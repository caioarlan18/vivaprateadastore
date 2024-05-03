require('dotenv').config();
const cors = require('cors')
const express = require('express');
const app = express();
const port = 8080;
const routes = require('./routes');
const path = require("path");
require('./config/dbConfig');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.resolve("uploads")));



app.listen(port, () => {
    console.log('Servidor funcionando');
})