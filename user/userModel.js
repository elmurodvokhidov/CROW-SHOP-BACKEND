// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//     clerkId:{
//         type: String,
//         required: true,
//         unique: true,
//     },
//     email_address:{
//         type: String,
//         required: true,
//         unique: true,
//         validate: {
//             validator: function (v) {
//                 return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v); // regex почты
//             },
//             message: props => `${props.value} is not a valid email address!`
//         },
//     },
//     username:{
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// }, { timestamps: true} )

// const User = mongoose.model('User', UserSchema)

// module.exports = User