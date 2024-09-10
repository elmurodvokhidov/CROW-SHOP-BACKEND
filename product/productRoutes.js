const express = require("express")
const { createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct, } = require("./productController.js")
const router = express.Router()

// create a new product
router.post('/', createProduct);

// getting all
router.get('/', getAllProducts);

// getting one by id
router.get('/:id', getProductById);

// updating one by id
router.put('/:id', updateProduct);

// deleting one by id
router.delete('/:id', deleteProduct);

module.exports = router