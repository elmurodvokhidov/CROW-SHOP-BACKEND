const { Schema, default: mongoose } = require("mongoose");

const UserSchema = new Schema ({
    clerkId:{
        type: String,
        required: true,
        unique: true,
    },
    email_address:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User