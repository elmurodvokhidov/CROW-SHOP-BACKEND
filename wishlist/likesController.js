const Likes = require("./likesModel")

const like = async (req, res) => {
    try {
        const productId = req.body.productId;

        const likes = await Likes.findOne({ user: req.userId });

        if (!likes) {
            const newLikes = new Likes({ user: req.userId, products: [{ productId }] });
            await newLikes.save();
            return res.status(201).json(newLikes);
        }

        const existingProductIndex = likes.products.findIndex(p => p.productId.toString() == productId);

        if (existingProductIndex > -1) {
           res.send("You liked this product!")
        } else {
            likes.products.push({ productId });
        }

        await likes.save();
        res.status(200).json(likes);
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    like
}