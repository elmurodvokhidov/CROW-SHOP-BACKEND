const Basket = require("./basket.model");

const getAllBasket = async (req, res) => {
    try {
        const authId = req.authId;
        const basket = await Basket.findOne({ user: authId }).populate("products.productId"); 
        
        if (!basket) {
            return res.status(404).json({ message: "Basket not found" });
        }
        res.status(200).json(basket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const addToBasket = async (req, res) => {
    try {
        const productId = req.body.productId;
        const count = req.body.count; 

        if (isNaN(count) || count < 0) {
            return res.status(400).json({ message: "Invalid count value. Must be a non-negative number." });
        }
        const basket = await Basket.findOne({ user: req.authId });

        if (!basket) {
            const newBasket = new Basket({ user: req.authId, products: [{ productId, count }] });
            await newBasket.save();
            return res.status(201).json(newBasket);
        }

        const existingProductIndex = basket.products.findIndex(p => p.productId.toString() === productId);

        if (existingProductIndex > -1) {
            basket.products[existingProductIndex].count = count;
        } else {
            basket.products.push({ productId, count });
        }

        await basket.save();
        res.status(200).json(basket);
    } catch (error) {
        console.error("Error adding to basket:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const removeFromBasket = async (req, res) => {
    try {
        const authId = req.authId;
        const { productId, count} = req.body;

        const basket = await Basket.findOne({ user: authId });
        if (!basket) {
            return res.status(404).json({ message: "Basket not found" });
        }
        const productIndex = basket.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex > -1) {
            if (basket.products[productIndex].count > count) {
                basket.products[productIndex].count = count;
            } else {
                basket.products.splice(productIndex, 1);
            }
        } else {
            return res.status(404).json({ message: "Product not found in basket" });
        }

        await basket.save();
        res.status(200).json(basket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const clearBasket = async (req, res) => {
    try {
        const authId = req.authId;

        const basket = await Basket.findOne({ user: authId });

        if (!basket) {
            return res.status(404).json({ message: "Basket not found" });
        }
        basket.products = [];

        if (basket.products.length === 0) {
            await Basket.deleteOne({ user: authId }); 
            return res.status(200).json({ message: "Basket deleted as it was empty" });
        }

        await basket.save();
        res.status(200).json({ message: "Basket cleared" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    getAllBasket,
    addToBasket,
    removeFromBasket,
    clearBasket,
};
