const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

module.exports = function (app) {
    app.use(express.json());
    app.use(express.static('public'));
    app.use(cors());
    app.use(bodyParser.json());
};