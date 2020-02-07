const {
    uri,
    options,
} = require('../constants/mongo');
const mongoose = require('mongoose');

module.exports = {
    connectDb() {
        return mongoose.connect(uri, options);
    },
};
