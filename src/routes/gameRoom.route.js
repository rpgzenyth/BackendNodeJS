const express = require('express');
const router = express.Router();
const gameRoom = require('../controllers/gameRooms.controller');

router.post('/gameRoom', gameRoom.create);

module.exports = router;