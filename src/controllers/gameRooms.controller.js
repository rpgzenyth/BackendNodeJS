const GameRoom = require('../models/gameRoom.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getAll = (req, res) => {
    GameRoom.find({
        $or:[
            {creator: req.user.id},
            {players:{ $in: req.user.id }}
        ]
    })
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
        if(previousPlayers && previousPlayers.includes(req.user.id) || creator == req.user.id){
            res.send({
                message: "You are already in this game room !"
            })
        } else {
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


exports.joinCharacter = (req, res) => {

    GameRoom.find({
        token: req.body.token
    })
    .then((data) => {
        var previousCharacters = data[0].characters;
        console.log("includes", previousCharacters.includes(req.body.characters));
        console.log(req.body.characters);
        if(previousCharacters && previousCharacters.includes(req.body.characters)){
            res.send({
                message: "The character is already in this game room !"
            })
        } else {
            GameRoom.findOneAndUpdate({
                token: req.body.token
            }, {
                $push: { characters: req.body.characters }
            })
            .then((data) => {
                res.send({
                    data: data,
                    message: "Character added in the game room"
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


exports.getOne = (req, res) => {
    GameRoom.find({_id: req.params.id,
        $or:[
            {creator: req.user.id},
            {players:{ $in: req.user.id }}
        ]
    })
    .populate("characters")
    .then(
        (data) => {
          res.status(200).json(data);
        }
    ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
    );
}