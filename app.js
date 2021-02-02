const server = require('./config/server.js');
const express = require('express');//tengo que llamar express, bparser, y routas de nuevo llamando al archivo del servidor donde ya estan?

const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());

app.use(require('./routes/products'));

