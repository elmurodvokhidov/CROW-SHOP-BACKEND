const mongoose = require('mongoose');
const Product = require('./productModel');

// creating
const createProduct = async (req, res) => {
    try {
        const { title, description, price, brand, size, color, stock } = req.body;

        if (!title || !description || !price || !brand || !size || !color || !stock) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        const imagePaths = req.files ? req.files.map(file => file.path) : [];
        
        const newProduct = await Product.create({
            title,
            description,
            price,
            brand,
            size,
            color,
            stock,
            images: imagePaths
        });
        res.status(201).json({ data: newProduct, message: "Product created successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

// getting all
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ data: products });
    } catch (error) {
        res.status(500).json({ message: 'Error getting products', error });
    }
};

// getting one by id
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' })
        }
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ data: product });
    } catch (error) {
        res.status(500).json({ message: 'Error getting product', error });
    }
};

// updating one by id
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' })
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

// deleting one by id
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' })
        }
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted', data: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};