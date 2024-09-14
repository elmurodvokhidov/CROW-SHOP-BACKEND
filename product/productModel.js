const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        brand: {
            type: String,
            trim: true,
        },
        size: {
            type: [String], // ['S', 'M', 'L']
            enum: ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'],
            required: true,
        },
        color: {
            type: [String],
            required: true,
        },
        stock: {
            type: Number,
            required: true,
            min: 0, // Запас товара на складе
        },
        images: {
            type: [String], // массив для ссылок на изображения
        },
        type: {
            type: [String], // ['male', 'female']
            enum: ['male', 'female', 'kid'], // allowed values
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
