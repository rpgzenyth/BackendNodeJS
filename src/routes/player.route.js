const express = require('express');
const router = express.Router();
const player = require('../controllers/players.controller');
const verifyPlayerToken = require('../middlewares/VerifyPlayerToken');
const validationSchema = require('../middlewares/validators/players.validation');

router.post('/players', validationSchema, player.create);
router.get('/players', player.getAll);
router.delete('/players/:id', player.deleteOne);
router.get('/players/get-player/:id', verifyPlayerToken, player.getOne);
router.get('/players/get-email/:email', player.getOneByEmail);
router.put('/players/:id', verifyPlayerToken, player.updateOne);
router.post('/login', player.login);

module.exports = router;