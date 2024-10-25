const express = require("express")
const {like} = require("./likesController")
const authmiddleware = require("../middleware/user.checker")
const router = express.Router()

//add wishlist
router.post("/:productId" , authmiddleware ,  like)

module.exports = router