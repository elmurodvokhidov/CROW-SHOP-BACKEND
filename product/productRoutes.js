const express = require("express")
const upload = require('../config/multer.js');
const { createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct, } = require("./productController.js")
const { getProductReviews } = require("../comments/commentController.js")
const router = express.Router()

// create a new product
router.post('/', upload.array('images', 10), createProduct); // до 10 файлов

// getting all
router.get('/', getAllProducts);

// getting one by id
router.get('/:id', getProductById);

// updating one by id
router.put('/:id', updateProduct);

// deleting one by id
router.delete('/:id', deleteProduct);

router.get('/:id/reviews', getProductReviews);

module.exports = router