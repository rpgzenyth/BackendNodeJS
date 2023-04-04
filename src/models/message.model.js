const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = mongoose.Schema(
    {
        message: {
            text: { type: String, required: true },
        },
        users: Array,
        sender: {
            type: Schema.Types.ObjectId,
            ref: "Player",
            required: true,
        },
    },
    {
        timestamps: true,
    }
  );
  
  module.exports = mongoose.model("Message", messageSchema);