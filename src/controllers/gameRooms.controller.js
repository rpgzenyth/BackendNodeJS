const GameRoom = require('../models/gameRoom.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getAll = (req, res) => {
    GameRoom.find()
    .then(
      (GameRoom) => {
        res.status(200).json(GameRoom);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
}

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

exports.join = (req, res) => {
    GameRoom.find({
        token: req.body.token
    })
    .then((data) => {
        var previousPlayers = data[0].players;
        var creator = data[0].creator;
        if(previousPlayers && previousPlayers.includes(req.body.user) || creator == req.user.id){
            res.send({
                message: "You are already in this game room !"
            })
        }else{
            GameRoom.findOneAndUpdate({
                token: req.body.token
            }, {
                $push: { players: req.user.id }
            })
            .then((data) => {
                res.send({
                    data: data,
                    message: "PLayer added in the game room"
                })
            })
        }
    })
    .catch((err) => {
        res.status(500).send({
            error: 500,
            message: err.message || "some error occured while adding player in GameRoom"
        })
    })
}