const express = require("express")
const { getAllComments ,  addComment, getOneComment, updateComment, deleteComment } = require("./commentController")
const router = express.Router()

//getAllComments
router.get("/" , getAllComments)


//getOneComment
router.get("/:id" , getOneComment)

//addComment
router.post("/:productId" , addComment)

//updateComment
router.put("/:id" , updateComment)

//deleteComment
router.delete("/:id" , deleteComment)

module.exports = router