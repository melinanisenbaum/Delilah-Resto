const { Router } = require('express');
const { authRole, findProduct} = require('../utils/utils');
const router = Router();
const { db } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    const products = await db.query('SELECT * FROM products',
        {
        type: QueryTypes.SELECT
        }
    );

    if(products) {
        res.status(200).json(products);
    } else {
        res.status(400);
    }
});

router.get('/:productId', async (req, res) => {

    const productId = +req.params.productId;
      
    const productData = await db.query(
      `SELECT * FROM products WHERE productId = :productId`, 
        {
          replacements: { productId },
          type: QueryTypes.SELECT
        }
    );
    
    if(productData.length === 0) {
      return res.status(404).send({ message: 'Not found'});
    } else {
      return res.status(200).json(productData);
    }
  });

router.post(
    '/',
    authRole(1),
    body('pname').not().isEmpty().trim().escape(),
    body('imgURL').isEmpty().trim().escape(),
    body('price').isInt(),
  
    async (req, res) => {
        const errors = validationResult(req);
      
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };
      
        const { pname, imgURL, price } = req.body; 

        const alreadyExistProduct = await db.query(
            'SELECT * FROM products WHERE pname = :pname',
            {
                replacements: { pname },
                type: QueryTypes.SELECT,
            }
        );
      
        if (alreadyExistProduct.length > 0) {
            return res.status(409).send({ error: 'The product already exists!' }).end();
        }

        else {
            const createUser = await db.query(
            'INSERT INTO products (pname, imgURL, price) VALUES (:pname, :imgURL, :price)',
            { 
                replacements: { pname, imgURL, price },
                type: QueryTypes.INSERT,
            }
            );
            res.status(200).send({ message: 'The product has been saved'});
        }
    }
);

router.put(
    '/:productId',
    authRole(1), 
    body('pname').not().isEmpty().trim().escape(),
    body('imgURL').isEmpty().trim().escape(),
    body('price').isInt(),
    async (req, res) => {
      const errors = validationResult(req);
        
      if (!errors.isEmpty()) {
        return res.status(400).send({ message: 'The product could not been updated' });
      };
  
      const { pname, imgURL, price } = req.body;
      const productId = +req.params.productId;
        
      await db.query(
        `UPDATE products SET pname = :pname, imgURL = :imgURL, price = :price WHERE productId = :productId`,
        { 
          replacements: { productId, pname, imgURL, price },
          type: QueryTypes.UPDATE,
        }
      );

      res.status(200).send({ message: 'The update has been succesfull' });
    }
  );

router.delete('/:productId', authRole(1), async (req, res) => {
    const productId = +req.params.productId;
  
    if (!findProduct(productId)) {
      res.status(404).send({ message: 'The product does not exist'})
    }
  
    if (findProduct(productId)) {
      await db.query(
        `DELETE FROM products WHERE productId = :productId`,
        {
          replacements: { productId },
          type: QueryTypes.DELETE,
        }
      )
      res.status(200). send({ message: 'The product has been deleted' });
    }
  });

module.exports = router
