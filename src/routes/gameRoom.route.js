const express = require('express');
const router = express.Router();
const gameRoom = require('../controllers/gameRooms.controller');
const verifyPlayerToken = require('../middlewares/VerifyPlayerToken');

router.get('/gameRooms', verifyPlayerToken, gameRoom.getAll);
router.post('/gameRoom', verifyPlayerToken, gameRoom.create);
router.put('/join', verifyPlayerToken, gameRoom.join);
router.put('/gameroom', verifyPlayerToken, gameRoom.joinCharacter);
router.get('/gameroom/:id', verifyPlayerToken, gameRoom.getOne);

module.exports = router;