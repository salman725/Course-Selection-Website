const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 3
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    status:{
        type: String,
        default: "active"
    },
    priviliges:{
        type: String,
        default: "user"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);