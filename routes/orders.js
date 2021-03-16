const { Router } = require('express');
const router = Router();
const { verifyToken } = require('../utils/utils.js');

router.get('/', (req, res) => {
    res.json({message: "Hello"});
  });
  
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