const express = require("express");
const { getAllBasket, addToBasket, removeFromBasket, clearBasket } = require("./basket.controller");
const authenticationUser = require("../middleware/user.checker");

const router = express.Router();

router.get("/", authenticationUser, getAllBasket);

router.post("/add", authenticationUser, addToBasket);

router.post("/remove", authenticationUser, removeFromBasket);

router.post("/clear",authenticationUser, clearBasket);

module.exports = router;
