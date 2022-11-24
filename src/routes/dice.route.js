const express = require('express');
const router = express.Router();
const dice = require('../controllers/dice.controller');
const verifyPlayerToken = require('../middlewares/VerifyPlayerToken');

router.post('/dice', verifyPlayerToken, character.create);


module.exports = router;