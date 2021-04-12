const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { authRole, authUser, findUser, findProduct, totalPrice, findOrder } = require('../utils/utils.js');
const { db } = require('../config/database');
const { QueryTypes } = require('sequelize');
const router = Router();
const bcrypt = require('bcrypt');
const user = require('../models/user.js');
const saltRounds = 10;

router.get('/', authRole(1), async (req, res) => {
  const data = await db.query(`SELECT * FROM users`,
    {
      type: QueryTypes.SELECT
    }
  );

  if(data) {
      res.status(200).json(data);
  } else {
      res.status(400);
    }
});

router.get('/:userId', authUser(), async (req, res) => {

  const userId = +req.params.userId;
    
  const userData = await db.query(
    `SELECT * FROM users WHERE userId = :userId`, 
      {
        replacements: { userId },
        type: QueryTypes.SELECT
      }
  );
  
  if(userData.length === 0) {
    return res.status(404).send({ message: 'Not found'});
  } else {
    return res.status(200).json(userData);
  }
});

router.put(
  '/:userId',
  authUser(), 
  body('email').isEmail().normalizeEmail(),
  body('phone').not().isEmpty().trim().escape(),
  body('adress').not().isEmpty().trim().escape(),
  body('passwd').isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);
      
    if (!errors.isEmpty()) {
      return res.status(400).send({ message: 'The account could not been updated' });
    };

    const { email, phone, adress, passwd } = req.body;
    const userId = +req.params.userId;
      
    await db.query(
      `UPDATE users SET email = :email, phone = :phone, adress = :adress WHERE userId = :userId`,
      { 
        replacements: { email, phone, adress, userId },
        type: QueryTypes.UPDATE,
      }
    );
    findUser(userId);

    if (user.id === userId) {  
      bcrypt.hash(passwd, saltRounds, async function(err, hash) {
        
        await db.query(
          `UPDATE auths SET auth_pass = :hash WHERE userId = :userId`,
          {
            replacements: { hash, userId },
            type: QueryTypes.UPDATE,
          }
        )
      });
    } 

    res.status(200).send({ message: 'The update has been succesfull' });
  }
);

router.delete('/delete/:userId', authUser(), async (req, res) => {
  const userId = +req.params.userId;

  if (!findUser(userId)) {
    res.status(404).send({ message: 'The user does not exist'})
  }

  if (findUser(userId)) {
    await db.query(
      `DELETE FROM users WHERE userId = :userId`,
      {
        replacements: { userId },
        type: QueryTypes.DELETE,
      }
    )
    await db.query(
      `DELETE FROM auths WHERE userId = :userId`,
      {
        replacements: { userId },
        type: QueryTypes.DELETE,
      }
    )
    res.status(200). send({ message: 'User id has been deleted' });
  }
});

router.post('/:userId/orders', async (req, res) => {//falta poder cargar varios productos
  const paym_id = +req.body.paym_id;
  const userId = +req.params.userId;
  const stat_id = +1;

  const createOrder = await db.query(
      `INSERT INTO orders (stat_id, paym_id, userId) VALUES (:stat_id, :paym_id, :userId)`,
      { 
        replacements: { stat_id, paym_id, userId },
        type: QueryTypes.INSERT,
      }
  );

  const orderId = +createOrder[0];
  console.log(orderId);

  const productsQuery = req.body.products.map((p) =>
    db.query( `SELECT * FROM products WHERE productId = :productId`,
      {
        replacements: { productId: +p.productId },
        type: QueryTypes.SELECT,
      }
    )
  );

  const products = await Promise.all(productsQuery);
  console.log(products);
 
  if (createOrder) {
    const order_product = products.map(async(p, key) => {
      const op_quantity = +req.body.products[key].op_quantity;
      const productId = +req.body.products[key].productId;
      const op_price = await totalPrice(op_quantity, productId);

        await db.query(
          `INSERT INTO order_product (userId, orderId, productId, op_quantity, op_price) VALUES (:userId, :orderId, :productId, :op_quantity, :op_price)`,
          { 
            replacements: { 
              userId,
              orderId,
              productId,
              op_quantity,
              op_price
            },
            type: QueryTypes.INSERT,
          }
        )
      });
      
      await Promise.all(order_product);

    res.status(200).send({ message: 'A new order has been created' });
  }
});
      
router.get('/:userId/orders', authUser(), async (req, res) => {
  const userId = +req.params.userId;
  const data = await db.query(
    `SELECT 
      order_status.stat_name,
      orders.order_datetime,
      orders.orderId,    
      payment.paym_name,
      users.fullname,
      users.adress
    FROM orders
    INNER JOIN order_status ON orders.stat_id = order_status.stat_id
    INNER JOIN payment ON orders.paym_id = payment.paym_id
    INNER JOIN users ON orders.userId = users.userId
    WHERE orders.userId = :userId`,      
    {
      replacements: { userId },
      type: QueryTypes.SELECT
    }
  );

  if(data) {
      res.status(200).json(data);
  } else {
      res.status(400);
    }
});

router.get('/:userId/orders/:orderId', authUser(), async (req, res) => {
  const orderId = +req.params.orderId;
  const data = await db.query(
    `SELECT 
      order_status.stat_name,
      orders.order_datetime,
      orders.orderId,    
      payment.paym_name,
      users.fullname,
      users.adress
    FROM orders
    INNER JOIN order_status ON orders.stat_id = order_status.stat_id
    INNER JOIN payment ON orders.paym_id = payment.paym_id
    INNER JOIN users ON orders.userId = users.userId
    WHERE orders.orderId = :orderId`,      
    {
      replacements: { orderId },
      type: QueryTypes.SELECT
    }
  );

  if(data) {
      res.status(200).json(data);
  } else {
      res.status(400);
    }
});

router.delete('/:userId/orders/delete/:orderId', authUser(), async (req, res) => {
  const orderId = +req.params.orderId;
  const getOrder = await findOrder(orderId);

  if (!getOrder) {
    res.status(404).send({ message: 'The order does not exist'})
  }

  if (getOrder) {
    const deleteOP = await db.query(
      `DELETE FROM order_product WHERE orderId = :orderId`,
      {
        replacements: { orderId },
        type: QueryTypes.DELETE,
      }
    );
    if (deleteOP) {
      await db.query(
        `DELETE FROM orders WHERE orderId = :orderId`,
        {
          replacements: { orderId },
          type: QueryTypes.DELETE,
        }
      )
      res.status(200).send({ message: 'The order has been deleted'});
    }
  }
});



module.exports = router