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
            type: [String], // ['s', 'm', 'l', 'xl', 'xxl', 'xxxl'] или ['35', '36', '37']
            enum: ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
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
        material: {
            type: String,
        },
        averageRating: { // средний рейтинг
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        numOfRatings: { // количество отзывов
            type: Number,
            default: 0,
        },
        reviews: [ // массив отзывов
            {
                type: mongoose.Types.ObjectId,
                ref: 'Review',
            },
        ],
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
