const mongoose = require('mongoose');
const favoriteProductSchema = new mongoose.Schema({
    productId: {
        type: String
    }
})
const paymentTransaction = new mongoose.Schema({
    transactionId: {
        type: String
    },
    transactionName: {
        type: String
    },
    transactionPrice: {
        type: String
    },
    transactionDate: {
        type: String
    }

})
const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },

    favoriteProduct: [favoriteProductSchema],
    transactions: [paymentTransaction]
})

module.exports = mongoose.model("user", UserSchema);