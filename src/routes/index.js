const express = require('express');
const router = express.Router();

const playerRouter = require('./player.route');
const characterRouter = require('./character.route');

router.use(playerRouter);
router.use(characterRouter);

module.exports = router;