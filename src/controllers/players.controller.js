const Player = require('../models/player.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.create = (req, res) => {

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const player = new Player({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash
        });
        player.save()
            .then((data) => {
                let playerToken = jwt.sign({
                    id: data._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: 86400,
                }
            );
            res.send({
            token:playerToken,
            auth: true
         })
    })
    .catch((err) => {
        console.log("msg:" + err.message);    
        res.status(500).send({
            error: 500,
            message: err.message || "some error occured while creating player"
        })
      })
    })

}

exports.getAll = (req, res) => {
  Player.find().then(
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
    Player.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Player with id ${req.params.id} not found`,
          // message:"Player with id" + req.params.id +"not found"
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
}

exports.getOneByToken = (req, res) => {
  Player.findById(req.user.id).populate('character')
  .then((data) => {
    if (!data) {
      res.status(404).send({
        message: `User with id ${req.user.id} not found`,
        // message:"User with id" + req.params.id +"not found"
      });
    }
    res.send(data);
  })
  .catch((err) => res.send(err));
}

exports.getOneByEmail = (req, res) => {
    Player.findOne({email: req.params.email})
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: false,
        });
      }
      res.status(200).send({
        message: true,
      });
    })
    .catch((err) => res.send(err));
}


exports.login = (req, res) => {
    Player.findOne({
      email: req.body.email,
    })
    .then((data) => {
          
    if (!data) {
      return res.status(404).send({
        auth: false,
          token: null,
          message: `No player find with email ${req.body.email}`,
      });
    }
  
    let passwordIsValid = bcrypt.compareSync(
      req.body.password,
      data.password
    );
  
    if (!passwordIsValid) {
      return res.status(401).send({
        auth: false,
        token: null,
        message: 'password is not valid',
      });
    }
  
    let playerToken = jwt.sign(
      {
        id: data._id,
        isAdmin: data.isAdmin
      },
      process.env.JWT_SECRET,
        {expiresIn: 86400}
      );
  
      res.send({
        auth: true,
        token: playerToken,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};


exports.updateOne = (req, res) => {
  var player = Player.findById(req.params.id)

  Player.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }
  )
  .then((data) => {
    player
    res.send({
      player: data
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

  var player = Player.findById(req.params.id)
  Player.remove(player)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Player with id ${req.params.id} not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
  
};