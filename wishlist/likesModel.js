const mongoose = require("mongoose")

const likesSchema = new mongoose.Schema(
    {
        user: {
         type: String,
         required: true,
        },
        products :
            {
                productId : {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                }
            }
    },
    {timestamps : true}
)

const Likes = mongoose.model('Likes', likesSchema);

module.exports = Likes
