const mongoose = require("mongoose");

const BasketSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    products: [{
        productId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        count: { 
            type: Number,
            required: true,
            default: 1
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model("Basket", BasketSchema);
