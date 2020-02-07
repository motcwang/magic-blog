const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    title: String,
    author: String,
    category: String,
    tag: [String],
    date: {
        type: Date,
        default: Date.now,
    },
    summary: String,
    body: String,
});
