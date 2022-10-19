const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameRoomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'Player'
    }]
}, { timestamps: true });

module.exports = mongoose.model('GameRoom', gameRoomSchema);