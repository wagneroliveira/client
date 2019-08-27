const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const client_controller = require('./client_controller');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect(
    'mongodb://mongodb:27017/clientPL', 
    {useNewUrlParser: true});

app.use('/clients', client_controller);

app.listen(3000);


// conexão manual sem utilizar o container do docker -> 'mongodb://localhost:27017/clientPL', 