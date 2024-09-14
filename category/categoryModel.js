// model nomi katta xarf bilan boshlansin...
const mongoose = require("mongoose")

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required : true
        }
    },
    { timestamps : true },
)

module.exports = mongoose.model("category" , categorySchema)