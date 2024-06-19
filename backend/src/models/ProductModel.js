const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    imageUrl: {
        type: String
    },
    title: {
        type: String
    },
    price: {
        type: String
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