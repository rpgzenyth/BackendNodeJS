const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diceSchema = new Schema({
    id : {
        type : Schema.Types.ObjectId,
        unique : true
    },
    result : {
        type : Int32Array,
        required : true
    },
    room : {
        type : Schema.Types.ObjectId,
        ref : 'gamerooms',
        required : true
    },
    character : {
        type : Schema.Types.ObjectId,
        ref : 'characters',
        required : true
    }

}, {timestamps : true });

module.exports = mongoose.model('Dice', diceSchema);