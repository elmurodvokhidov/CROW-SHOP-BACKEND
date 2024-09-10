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
        // category: {
        //     type: mongoose.Types.ObjectId,
        //     ref: 'Category', // Ссылка на модель Category
        //     required: true,
        // },
        brand: {
            type: String,
            trim: true,
        },
        size: {
            type: [String], // Массив строк для размеров => ['S', 'M', 'L']
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
        // images: {
        //     type: [String], // массив для ссылок на изображения
        // },
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
