const express = require("express")
const {getAllCategory , getOneCategory , createNewCategory , updateCategory , deleteCategory} = require("./categoryController")
const router = express.Router()

//get all categories
router.get("/" , getAllCategory)

//get one category
router.get("/:id" , getOneCategory)

//create new categories
router.post("/" , createNewCategory)

//update categories
router.put("/:id" , updateCategory)

//delete categories
router.delete("/:id" , deleteCategory)

module.exports = router