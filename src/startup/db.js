const winston = require('winston');
const mongoose = require('mongoose');

const databasePath = process.env.DB;

module.exports = function () {
    mongoose.connect(databasePath,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .then(() => winston.info("Connected to MongoDB"));
}