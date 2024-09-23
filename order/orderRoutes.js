const express = require('express');
const { createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder } = require('./orderController.js');
const router = express.Router();

router.post('/payment', createOrder);
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id', updateOrderStatus);
router.delete('/orders/:id', deleteOrder);

module.exports = router;
