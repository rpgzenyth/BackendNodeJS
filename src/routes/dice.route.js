const express = require('express');
const router = express.Router();
const dice = require('../controllers/dice.controller');
const verifyPlayerToken = require('../middlewares/VerifyPlayerToken');

router.post('/dice', verifyPlayerToken, dice.create);


module.exports = router;