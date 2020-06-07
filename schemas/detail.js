const mongoose = require('mongoose');

const { Schema } = mongoose;
const detailSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    goodsImages: {
        type: Array,
        required: true,
    },
    detailImages: {
        type: Array,
        required: false,
    },
    comments: {
        type: Array,
        required: false,
        default: [],
    },
}, {versionKey : false});

module.exports = mongoose.model('Detail', detailSchema);