const GameRoom = require('../models/gameRoom.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.create = (req, res) => {

    let token = jwt.sign({}, 'secret', { expiresIn: '1h' });

    const gameRoom = new GameRoom({
        name: req.body.name,
        token: token,
        creator: req.user.id
    });

    gameRoom
        .save()
        .then((data) => {
            res.send({
                data: data,
                token: token,
                success: true
            });
          })
        .catch((err) => {
            res.status(500).send({
                error: 500,
                message: err.message || 'some error occured while creating the room',
            });
        });
}