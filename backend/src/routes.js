const express = require('express');
const routes = express.Router();
const userController = require("./controller/UserController");
const ProductController = require("./controller/ProductController");
const CheckoutController = require("./controller/CheckoutController");
// authenticate
routes.post("/auth/register", userController.register);
routes.post("/auth/login", userController.login);
routes.get("/auth/logged/:id", userController.checkToken, userController.logged);


// private route product

routes.post("/product/create", ProductController.verifyAdmin, ProductController.create);
routes.post("/product/delete/:id", ProductController.verifyAdmin, ProductController.delete);
routes.put("/product/update", ProductController.verifyAdmin, ProductController.update);
// public route favorite product
routes.post("/product/addfavorite/:id", ProductController.addFavorite);
routes.get("/product/readfavorites/:userId", ProductController.readFavorites);
routes.post("/product/removefavorite/:id", ProductController.removeFavorite);
routes.get("/product/renderfavorite/:userId", ProductController.renderizarProduto);

//public route product
routes.get("/product/all", ProductController.read);
routes.get("/product/read/:id", ProductController.readOne);


//checkout controller
routes.post("/criarcheckout", CheckoutController.criarCheckout)

module.exports = routes;