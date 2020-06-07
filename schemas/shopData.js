const mongoose = require('mongoose');

const { Schema } = mongoose;
const shopDataSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: false,
    },
    comments: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    sale: {
        type: Number,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    kind1: {
        type: String,
        required: true,
    },
    kind2: {
        type: String,
        required: true,
    },

}, {versionKey : false});

module.exports = mongoose.model('ShopData', shopDataSchema);