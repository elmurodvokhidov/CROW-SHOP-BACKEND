const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({
        fullname: {
            type: String,
            required: true
        },
        phoneNumber:{
            type: Number,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        isadmin: {
            type: Boolean,
            default: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v); // regex почты
                },
                message: props => `${props.value} is not a valid email address!`
            },
        },
}, {timestamps: true})

module.exports = mongoose.model("admin", AdminSchema)