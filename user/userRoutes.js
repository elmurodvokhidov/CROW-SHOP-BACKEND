const express = require("express");
const { createUser } = require("./userController");
const router = express.Router()

router.get('/profile', createUser);

module.exports = router