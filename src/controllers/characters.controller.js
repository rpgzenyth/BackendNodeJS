const Character = require('../models/character.model');
const Player = require('../models/player.model');
const bcrypt = require('bcrypt');

exports.create = (req, res) => {
    const character = new Character({
        name: req.body.name,
        race: req.body.race,
        class: req.body.class,
        age: req.body.age,
        waist: req.body.waist,
        weight: req.body.weight,
        eyes: req.body.eyes,
        skin: req.body.skin,
        hair: req.body.hair,
        personality: req.body.personality,
        ideals: req.body.ideals,
        links: req.body.links,
        defects: req.body.defects,
        history: req.body.history,
        player: req.user.id
    });

    character.save()
    .then((data) => {
        Player.findByIdAndUpdate(req.user.id, {
          $push: { characters: data._id }
        })
        .then((player) => {
          res.send({
            character: data,
            player: player,
            created: true
          })
        })
        .catch((err) => {
          console.log(err.message);
          res.send(err);
        })
        
    })
    .catch((err) => {
        console.log(err.message);    
        res.status(500).send({
            error: 500,
            message: err.message || "some error occured while creating character"
        })
    })
}


exports.getAll = (req, res) => {
    Character.find().then(
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

exports.getAllByUser = (req, res) => {
    Character.find({"player": req.user.id}).then(
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


exports.getOne = (req, res) => {
    var id = req.params.id;
    Character.findById(id)
    .populate("player")
    .then((data) => {
        res.send(data);

    })
    .catch((err) => {
        console.log(err.message);
        res.send(err);
    })
}


exports.updateOne = (req, res) => {
    var character = Character.findById(req.params.id)
  
    Character.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        race: req.body.race,
        class: req.body.class,
        age: req.body.age,
        waist: req.body.waist,
        weight: req.body.weight,
        eyes: req.body.eyes,
        skin: req.body.skin,
        hair: req.body.hair,
        personality: req.body.personality,
        ideals: req.body.ideals,
        links: req.body.links,
        defects: req.body.defects,
        history: req.body.history,
        player: req.body.player
      }
    )
    .then((data) => {
      character
      res.send({
        character: data
      })
    })
    .catch((err) => {
        res.status(500).send({
        error: 500,
        message: err.message || "NULL"
    })
  })
    
};


exports.deleteOne = (req, res) => {

  var character = Character.findById(req.params.id)
  Character.remove(character)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Character with id ${req.params.id} not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
  
};