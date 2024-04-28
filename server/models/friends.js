const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    bio: {
        type: String,
        required: false
    }
})

const friedModel = mongoose.model('friends', friendSchema)

module.exports = friedModel