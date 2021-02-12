const { Router } = require('express');
const { verifyToken } = require('../utils/utils.js');
const { db } = require('../config/database');
//const products = require('../models/products');
const router = Router();

router.get('/', verifyToken, async (req, res) => {
    db.query('SELECT * orders FROM delilahResto', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

router.put('/orderId:', verifyToken, async (req, res) => {
    const { state } = req.body;
    const { orderId } = req.params;
        
    db(query, [id, name, imageURL, price], (err, rows, fields) => {//corregir este
        if(!err) {
            res.json({Status: 'The update has been succesfull'});
        } else {
            console.log(err);
        }
    })
});

router.delete('/orderId:', verifyToken, async (req, res) => {
    const { orderId } = req.params;
    db.query('DELETE FROM orser WHERE id = ?', [orderId], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'order id ${orderId} has been deleted'});
        } else {
            console.log(err);
        }
    })
});

module.exports = router;