const mongoose = require('mongoose');
const VariationSchema = new mongoose.Schema({
    name: {
        type: String
    }
})
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
    variations: [VariationSchema]
})

module.exports = mongoose.model("Products", ProductSchema);