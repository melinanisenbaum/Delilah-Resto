const { Router } = require('express');
//const products = require('../models/products');
const router = Router();

module.exports = router;

// const users = [
//     {id = 1, name = 'melina'}
// ]

// app.get('/users', (req, res) => {
//     res.json(users);
// });

// app.get('/users/:userId', (req, res) => {
//     console.log(req.params);
//     res.status(200);
//     res.body('The update has been succesfull');
// });

// app.put('/users/:userId', (req, res) => {
//     console.log(req.body);
//     res.json(users.find(user => user.id === req.params.id));
// });