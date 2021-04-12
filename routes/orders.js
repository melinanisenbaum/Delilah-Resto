const { Router } = require('express');
const { db } = require('../config/database.js');
const router = Router();
const { authRole, findOrder } = require('../utils/utils.js');
const { QueryTypes } = require('sequelize');

router.get('/', authRole(1), async (req, res) => {
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
      INNER JOIN users ON orders.userId = users.userId`,
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

router.put('/:orderId', authRole(1), async (req, res) => {//corroborar que funcione
  const orderId = req.params.orderId;
  const newStatus = req.body.newStatus;
  const update = await db.query(
    `UPDATE orders SET stat_id = :newStatus WHERE orderId = :orderId`,      
    {
      replacements: {newStatus, orderId},
      type: QueryTypes.UPDATE
    }
  );

  if(update) {
      res.status(200).send({message: 'The update has been succesfull'});
  } else {
      res.status(400).send({message: 'The order could not been updated'});
    }
});

router.delete('/:orderId', authRole(1), async (req, res) => {
  const orderId = +req.params.orderId;
  
    if (!findOrder(orderId)) {
      res.status(404).send({ message: 'The order does not exist'})
    }
  
    if (findOrder(orderId)) {
      await db.query(
        `DELETE FROM orders WHERE orderId = :orderId`,
        {
          replacements: { orderId },
          type: QueryTypes.DELETE,
        }
      )
      res.status(200). send({ message: 'The order has been deleted' });
    }
  });

module.exports = router;