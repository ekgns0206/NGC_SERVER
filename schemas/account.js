const mongoose = require('mongoose');

const { Schema } = mongoose;
const accountSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },

}, {versionKey : false});

module.exports = mongoose.model('Account', accountSchema);