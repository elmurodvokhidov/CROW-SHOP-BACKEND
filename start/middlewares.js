const express = require('express');
const cors = require('cors');
require('dotenv').config();

module.exports = function (app) {
    app.use(express.json());
    app.use(express.static('public'));
    app.use(cors());
};