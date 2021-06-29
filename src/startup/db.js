const winston = require('winston');
const mongoose = require('mongoose');

const databasePath = process.env.DB;

module.exports = function () {
    console.log(databasePath);
    mongoose.connect(databasePath,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .then(() => winston.info("Connected to MongoDB"))
        .catch(() => winston.info("Error Connecting Database"))
}