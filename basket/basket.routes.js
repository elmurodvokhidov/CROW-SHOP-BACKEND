const express = require("express");
const { getAllBasket, addToBasket, removeFromBasket, clearBasket } = require("./basket.controller");
// const authenticationUser = require("../middleware/user.checker"); // Ushbu middleware qilayotgan ishni bizga ClerkExpressRequireAuth() funksiyasi amalga oshirmoqda...
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node"); // Batafsil ushbu havola yordamida ma'lumot oling... https://clerk.com/docs/backend-requests/handling/nodejs#clerk-express-require-auth

const router = express.Router();

router.get("/", ClerkExpressRequireAuth(), getAllBasket);

router.post("/add", ClerkExpressRequireAuth(), addToBasket);

router.post("/remove", ClerkExpressRequireAuth(), removeFromBasket);

router.post("/clear", ClerkExpressRequireAuth(), clearBasket);

module.exports = router;