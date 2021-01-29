if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');//manejo de imagenes
const morgan = require('morgan');//dev
const path = require('path');

//Initialization
const app = express();
//require('./routes/database');

console.log(`NODE_ENV=${config.NODE_ENV}`);

//Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false}));//interpretacion de formulario como json

//Routes
app.use('/products', require('../routes/products'));
app.use('/users', require('../routes/users'));
app.use('/orders', require('../routes/orders'));

//Static files(le digo al servidor que archivos van al navegador: htmls css, imagenes, etc)
app.use(express.static(path.join(__dirname, 'public')));

//Starting server
app.listen(config.PORT, config.HOST, function () {
    console.log(`App listening on http://${config.HOST}:${config.PORT}`);
});

module.exports = app;