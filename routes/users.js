const { Router } = require('express');
const passport = require('passport');
const { verifyToken, filterAdmin } = require('../utils/utils.js');
//const { db } = require('../config/database');
//const users = require('../models/users');
const router = Router();

router.get('/', (req, res) => {
    res.json({message: "Hello"});
  });
  
// router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     db.query('SELECT * users FROM delilahResto', (err, rows, fields) => {
//         if(!err) {
//             res.json(rows);
//         } else {
//             console.log(err);
//         }
//     })
// });

// router.post('/', verifyToken, async (req, res) => {
//     const { userId, username, nameAndLastname, email, phone, adress, password } = req.body;
//     const query = 'CALL userAddOrEddit (?, ?, ?, ?, ?, ?, ?)';

//     db.query(query, [userId, username], (err, rows, fields) => {//ver otro ejemplo
//         if(!err) {
//             res.json({Status: 'The user has been created'});
//         } else {
//             console.log(err);
//         }
//     })
// });

// router.get('/:userId', verifyToken, async (req, res) => {
//     const { userId } = req.params;
  
//     db.query('SELECT * users FROM delilahResto WHERE id = ?', [userId], (err, rows, fields) => {
//         if(!err) {
//             res.json(rows);
//         } else {
//             console.log(err);
//         }
//     })
// });

// router.get('/:userId/orders', verifyToken, async (req, res) => {
//     const { userId } = req.params;
   
//     db.query('SELECT * users FROM delilahResto WHERE id = ?', [userId], (err, rows, fields) => {
//         if(!err) {
//             res.json(rows);//aca hay que ver lo que tiene que mostrar
//         } else {
//             console.log(err);
//         }
//     })
// });

// router.post('/:userId/orders', async (req, res) => {
//     const { userId, username, nameAndLastname, email, phone, adress, password } = req.body;
//     const query = 'CALL userAddOrEddit (?, ?, ?, ?, ?, ?, ?)';

//     db.query(query, [userId, username, nameAndLastname, email, phone, adress, password], (err, rows, fields) => {//ver otro ejemplo
//         if(!err) {
//             res.json({Status: 'The order has been created'});
//         } else {
//             console.log(err);
//         }
//     })
// });

// router.get('/:userId/orders/orderId', async (req, res) => {
//     const { orderId } = req.params;
//     const { userId } = req.params;
   
//     db.query('SELECT * users FROM delilahResto WHERE userId = ? AND SELECT FROM userId = ? WHERE orderId = ?', [userId, orderId], (err, rows, fields) => {
//         if(!err) {
//             res.json(rows);//aca hay que ver lo que tiene que mostrar
//         } else {
//             console.log(err);
//         }
//     })
// });

// router.delete('/:userId/orders/orderId', async (req, res) => {
//     const { orderId } = req.params;

//     db.query('DELETE FROM orders WHERE orderId = ?', [orderId], (err, rows, fields) => {
//         if(!err) {
//             res.json({Status: 'order id ${orderId} has been deleted'});
//         } else {
//             console.log(err);
//         }
//     })
// });

// router.put('/userId:', async (req, res) => {
//     const { username, nameAndLastname, email, phone, adress, password } = req.body;
//     const { userId } = req.params;
//     const query = 'CALL userAddOrEddit (?, ?, ?, ?, ?, ?, ?)';
    
//     db.query(query, [userId, nameAndLastname], (err, rows, fields) => {
//         if(!err) {
//             res.json({status: 'The update has been succesfull'});
//         } else {
//             console.log(err);
//         }
//     })
// });

// router.delete('/userId:', async (req, res) => {
//     const { userId } = req.params;
//     db.query('DELETE FROM users WHERE userId = ?', [userId], (err, rows, fields) => {
//         if(!err) {
//             res.json({Status: 'User id ${userId} has been deleted'});
//         } else {
//             console.log(err);
//         }
//     })
// });

module.exports = router