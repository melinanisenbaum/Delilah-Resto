const { Router } = require('express');
const router = Router();
const { body, validationResult } = require('express-validator');
const { db } = require('../config/database');
const { QueryTypes } = require ('sequelize');
const { createAccountLimiter } = require('../utils/utils.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post(
  '/',
  createAccountLimiter,
  body('username').not().isEmpty().trim().escape(),
  body('fullname').not().isEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('phone').not().isEmpty().trim().escape(),
  body('adress').not().isEmpty().trim().escape(),
  body('passwd').isLength({ min: 8 }),
  
  async (req, res) => {
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      };
      
      const { username, fullname, email, phone, adress } = req.body; 

      const alreadyExistUser = await db.query(
        'SELECT * FROM users WHERE fullname = :fullname OR email = :email',
        {
          replacements: { fullname, email },
          type: QueryTypes.SELECT,
        }
      );
      
      if (alreadyExistUser.length > 0) {
        return res.status(409).send({ error: 'The user already exists!' }).end();
      }

      else {

        const createUser = await db.query(
          'INSERT INTO users (username, fullname, email, phone, adress) VALUES (:username, :fullname, :email, :phone, :adress)',
          { 
            replacements: { username, fullname, email, phone, adress },
            type: QueryTypes.INSERT,
          }
        );

        const newUserId = +createUser[0];

        const { passwd } = req.body;

        bcrypt.hash(passwd, saltRounds, async function(err, hash) {
          await db.query(
            'INSERT INTO auths (auth_pass, userId) VALUES (:hash, :newUserId)',
            {
              replacements: { hash, newUserId},
              type: QueryTypes.INSERT,
            }
          );
        });

        res.json({ message: 'Thanks for registering' });
      }
  });

module.exports = router