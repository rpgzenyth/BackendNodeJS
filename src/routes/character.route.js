const express = require('express');
const router = express.Router();
const character = require('../controllers/characters.controller');

router.post('/characters', character.create);
router.get('/characters', character.getAll);
router.get('/characters/:id', character.getOne);
router.put('/characters/:id', character.updateOne);
router.delete('/characters/:id', character.deleteOne);

module.exports = router;