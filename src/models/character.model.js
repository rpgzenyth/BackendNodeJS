const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
        unique: true
    },
    waist: {
        type: Boolean,
        required: true,
    },
    weight: {
        type: String,
        required: true
    },
    eyes: {
        type: String,
        required: true
    },
    skin: {
        type: String,
        required: true
    },
    hair: {
        type: String,
        required: true
    },
    personality: {
        type: String,
        required: true
    },
    ideals: {
        type: String,
        required: true
    },
    links: {
        type: String,
        required: true
    },
    defects: {
        type: String,
        required: true
    },
    history: {
        type: String,
        required: true
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