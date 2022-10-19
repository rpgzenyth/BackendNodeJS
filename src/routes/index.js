const express = require('express');
const router = express.Router();

const playerRouter = require('./player.route');
const characterRouter = require('./character.route');
const gameRoomRouter = require('./gameRoom.route');

router.use(playerRouter);
router.use(characterRouter);
router.use(gameRoomRouter);

module.exports = router;