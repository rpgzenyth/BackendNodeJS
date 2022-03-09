const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    race: {
        type: String
    },
    class: {
        type: String
    },
    age: {
        type: String
    },
    waist: {
        type: String
    },
    weight: {
        type: String
    },
    eyes: {
        type: String
    },
    skin: {
        type: String
    },
    hair: {
        type: String
    },
    personality: {
        type: String
    },
    ideals: {
        type: String
    },
    links: {
        type: String
    },
    defects: {
        type: String
    },
    history: {
        type: String
    },
    player: {
        type: Schema.Types.ObjectId,
        ref: 'Player'
    },
    // stats: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Stats'
    // },
    // spell: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Spells'
    // }
});

module.exports = mongoose.model('Character', characterSchema);