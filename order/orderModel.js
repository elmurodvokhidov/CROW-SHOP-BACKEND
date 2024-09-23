const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'admin',
            required: true,
        },
        products: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Product",
            }
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
