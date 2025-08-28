const express = require('express');
const router = express.Router();
const { postNumbers } = require('../controllers/numbersController');

router.post('/', postNumbers);

module.exports = router;
