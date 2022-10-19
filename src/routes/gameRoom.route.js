const express = require('express');
const router = express.Router();
const gameRoom = require('../controllers/gameRooms.controller');
const verifyPlayerToken = require('../middlewares/VerifyPlayerToken');

router.post('/gameRoom', verifyPlayerToken, gameRoom.create);

module.exports = router;