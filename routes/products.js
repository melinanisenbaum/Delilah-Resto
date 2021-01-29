const { Router } = require('express');
const sequelize = require('../config/database');
//const products = require('../models/products');
const router = Router();//define rutas del servidor en forma ordenada

router.get('/', async (req, res) => {
    sequelize.query('SELECT * products FROM delilahResto', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
    //const products = await Products.find();
    //res.send(products);
    //res.status('200: ok');
    //const productItems = await product.find();
    //res.json(products)
});

router.post('/', async (req, res) => {
    res.send('received')
});

router.patch('/productId:', async (req, res) => {
    console.log(res.body),
    res.send('received')
});

router.delete('/productId:', async (req, res) => {
    res.send('Product id ${productId} has been deleted')
});

module.exports = router;