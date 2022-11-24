const Dice = require("../models/dice.model");

exports.create = (req, res) => {
    const dice = new Dice({
        result: req.body.result,
        room: req.room.id,
        character: req.user.id
    });

    dice.save()
    .then((data) =>{
        res.send({
            dice: data,
            created: true
        })
    })
    .catch((err) => {
        console.log(err.message);    
        res.status(500).send({
            error: 500,
            message: err.message || "some error occured while saving roll dice"
        })
    })


}