const { Router } = require('express');
const router = Router();

//Home: localhost:3000
router.get('/', (req, res) => res.send('Hello App'));

module.exports = router