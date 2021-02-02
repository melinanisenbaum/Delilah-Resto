const { Router } = require('express');
const db = require('../config/database');
//const products = require('../models/products');
const router = Router();//define rutas del servidor en forma ordenada

router.get('/', async (req, res) => {
    db.query('SELECT * products FROM delilahResto', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    db.query('SELECT * products FROM delilahResto WHERE id = ?', [id], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

router.post('/', async (req, res) => {
    const { id, name, salary } = req.body;
    const query = `
    SET @id = ?;
    SET @name = ?;
    SET @imageURL = ?;
    SET @price = ?;
    CALL employeeAddOrEddit (@id, @name, @imageURL, @price);`;
    db.query(query, [id, name], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Product saved'});
        } else {
            console.log(err);
        }
    })
});

router.patch('/productId:', async (req, res) => {
    console.log(res.body),
    res.send('received')
});

router.delete('/productId:', async (req, res) => {
    res.send('Product id ${productId} has been deleted')
});

module.exports = router
