const express = require('express');
const cors = require('cors');
const auth = require('../routes/auth');
const home = require('../routes/home');
const users = require('../routes/users');
const brands = require('../routes/brands');
const catalogues = require('../routes/catalogues');
const customers = require('../routes/customers');
const notifications = require('../routes/notification');
const setups = require('../routes/setup');
const tags = require('../routes/tags');

const whitelist = [
    'http://localhost:3200',
    'http://localhost:3000',
    'http://localhost:3200/users',
    'http://localhost:3200/users/auth',
];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(null, true)
        }
    }, credentials: true
}

module.exports = function (app) {

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use('/api/auth', auth);
    app.use('/api/home', home);
    app.use('/api/notifications', notifications);
    app.use('/api/users', users);
    app.use('/api/brands', brands);
    app.use('/api/catalogues', catalogues);
    app.use('/api/customers', customers);
    app.use('/api/setups', setups);
    app.use('/api/tags', tags);

}

