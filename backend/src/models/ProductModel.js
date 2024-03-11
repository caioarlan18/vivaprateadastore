const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    src: {
        type: String
    },
    title: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    variations: {
        type: String
    }
})

module.exports = mongoose.model("Products", ProductSchema);