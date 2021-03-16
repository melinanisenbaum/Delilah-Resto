const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const { db } = require('../config/database');
const { QueryTypes } = require ('sequelize');
const { createAccountLimiter } = require('../utils/utils.js');

// TIRA ERROR EN EL REQUEST. NO ENCUENTRA DB?

router.post('/', createAccountLimiter, async (req, res) => {

  const user = {
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    phone: req.body.phone,
    adress: req.body.adress
  }; 

  console.log(user);

  const alreadyExistUser = await db.query(
    'SELECT * FROM users WHERE fullname = :fullname OR email = :email',
    {
     replacements: { username },
      type: QueryTypes.SELECT
    }).catch((err) => {
      console.log('Error: ', err)
    });

  //cont newUser = new User({ username, fullname, email, phone, adress }); para usar con sequelize y modelos
  const createUser = await db.query(
    'INSERT INTO users (username, fullname, email, phone, adress) VALUES (:username, :fullname, :email, :phone, :adress)',
    { replacements: user,
      type: QueryTypes.INSERT,
    }. catch((err) => {
    console.log('Error: ', err);
    res.json({ error: 'Cannot register user at the moment!'})
    }
  ));

  if (createUser) {
    console.log(createUser);
    res.json({ message: 'Thanks for registering' });
  }
  if (alreadyExistUser) {
    return res.json ({ message: 'User with email already exist!' });
  }
});

module.exports = router