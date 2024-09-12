const express = require('express');
const cors = require('cors');
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');
require('dotenv').config();

module.exports = function (app) {
    app.use(ClerkExpressWithAuth({
        apiKey: process.env.CLERK_API_KEY,
        frontendApi: process.env.CLERK_FRONTEND_API,
    }));
    app.use(express.json());
    app.use(cors());
};