if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const express = require('express');//tengo que llamar express, bparser, y routas de nuevo llamando al archivo del servidor donde ya estan?
const bodyParser = require('body-parser');
const multer = require('multer');//manejo de imagenes
const morgan = require('morgan');//dev
const path = require('path');//manejo de directorios 
const config = require('./config/config.js');
const { limiter } = require('./utils/utils.js');
const helmet = require('helmet');//seguridad

const app = express();

//Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false}));//interpretacion de formulario como json
app.use(limiter);


//Routes
app.use('/login', require('./routes/authentication'));
app.use('/registration', require('./routes/registration'));
app.use('/products', require('./routes/products'));
app.use('/users', require('./routes/users'));
app.use('/orders', require('./routes/orders'));

//Static files(le digo al servidor que archivos van al navegador: htmls css, imagenes, etc)
app.use(express.static(path.join(__dirname, 'public')));

//helpers

//Starting server
app.listen(config.PORT, config.HOST, function () {
    console.log(`App listening on port http://${config.HOST}:${config.PORT}`);
});
