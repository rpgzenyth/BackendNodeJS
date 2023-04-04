const express = require('express');
const router = express.Router();
const message = require('../controllers/messages.controller');
const verifyPlayerToken = require('../middlewares/VerifyPlayerToken');

router.post("/addmsg", message.addMessage);
router.post("/getmsg", message.getMessages);

module.exports = router;