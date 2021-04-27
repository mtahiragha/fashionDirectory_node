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
    app.use('/auth', auth);
    app.use('/home', home);
    app.use('/notifications', notifications);
    app.use('/users', users);
    app.use('/brands', brands);
    app.use('/catalogues', catalogues);
    app.use('/customers', customers);
    app.use('/setups', setups);
    app.use('/tags', tags);

}

