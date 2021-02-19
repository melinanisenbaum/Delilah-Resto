const { Router } = require('express');
const { verifyToken } = require('../utils/utils');
const router = Router();

router.get('/', async (req, res) => {
    db.query('SELECT * products FROM delilahResto', (err, rows) => {
        console.log(db.query);
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

router.post('/', verifyToken, async (req, res) => {
    const { id, name, imageURL, price } = req.body;
    const query = 'CALL productAddOrEddit (?, ?, ?, ?)';

    db.query(query, [id, name], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'The product has been saved'});
        } else {
            console.log(err);
        }
    })
});

// router.get('/:productId', async (req, res) => {
//     const { id } = req.params;
//     console.log(id);
//     db.query('SELECT * products FROM delilahResto WHERE id = ?', [id], (err, rows, fields) => {
//         if(!err) {
//             res.json(rows);
//         } else {
//             console.log(err);
//         }
//     })
// });

router.put('/productId:', verifyToken, async (req, res) => {
    const { name, imageURL, price } = req.body;
    const { productId } = req.params;
    const query = 'CALL employeeAddOrEddit (?, ?, ?)';
    
    db.query(query, [productId, name, imageURL, price], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'The update has been succesfull'});
        } else {
            console.log(err);
            res.status(400).send('not ok')
        }
    })
});

router.delete('/productId:', verifyToken, async (req, res) => {
    const { productId } = req.params.productId;
    db.query('DELETE FROM products WHERE id = ?', [productId], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Product id ${productId} has been deleted'});
        } else {
            console.log(err);
        }
    })
});

module.exports = router
