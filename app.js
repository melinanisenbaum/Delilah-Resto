const server = require('./config/server.js');

require('./routes')(app);

//const express = require('express');

//Initialization
//const app = express();

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
