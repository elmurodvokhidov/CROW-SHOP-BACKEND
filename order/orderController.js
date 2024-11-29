const Order = require('./orderModel.js')
const Product = require('../product/productModel.js')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { user, products, address } = req.body

        // Calculate total amount
        let totalAmount = 0
        for (const productId of products) {
            const product = await Product.findById(productId)
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${productId}` })
            }
            totalAmount += product.price
        }

        const newOrder = new Order({
            user,
            products,
            totalAmount,
            address,
        })
        await newOrder.save()

        const charge = await createPayment(newOrder._id)
        if (!charge) {
            return res.status(500).json({ message: 'Payment failed' })
        }

        return res.status(201).json(newOrder, charge)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user products')
        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// Get a single order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user products')
        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }
        return res.status(200).json(order)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' })
        }

        return res.status(200).json(updatedOrder)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id)
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' })
        }

        return res.status(200).json({ message: 'Order deleted successfully' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// Handle Stripe payment
const createPayment = async (orderId) => {
    try {
        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }

        const charge = await stripe.charges.create({
            amount: order.totalAmount * 100,
            currency: 'usd',
            metadata: { orderId: order._id.toString() },
        })

        return {charge}
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    createPayment,
}
