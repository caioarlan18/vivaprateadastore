const productModel = require("../models/ProductModel");
const fs = require("fs");
const userModel = require('../models/UserModel');
module.exports = {

    //private routes

    async verifyAdmin(req, res, next) {
        const { userId } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).json({ msg: "Faça login" });
        } else if (user.role !== "admin") {
            return res.status(400).json({ msg: "Você não tem permissão para estar aqui" });
        }
        next();

    },


    async create(req, res) {
        const { title, price, description, category, variations } = req.body;
        const file = req.file;
        if (!title || !price || !description || !category || !file) {
            return res.status(500).json({ msg: "Faltando dados" });
        }
        try {
            const product = await productModel.create({
                src: `uploads/${file.filename}`,
                title,
                price,
                description,
                category,
                variations
            });
            return res.status(201).json({ msg: "Produto criado com sucesso", product });
        } catch (err) {
            return res.status(400).json({ msg: "Erro ao criar produto " + err });
        }

    },

    async update(req, res) {

        const { title, price, description, category, variations, productId } = req.body;
        const file = req.file;


        if (!title || !price || !description || !category) {
            return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
        }

        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ msg: "Produto não encontrado" });
        }
        product.title = title;
        product.price = price;
        product.description = description;
        product.category = category;
        product.variations = variations;

        if (file) {
            if (product.src) {
                fs.unlinkSync(product.src);
            }
            product.src = `uploads/${file.filename}`;
        }

        await product.save();
        return res.status(200).json({ msg: "Produto atualizado com sucesso", product });

    },

    async delete(req, res) {
        const productId = req.params.id;
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(400).json({ msg: "Esse produto não existe" });
        }
        try {
            fs.unlinkSync(product.src);
            await productModel.deleteOne(product);
            return res.status(200).json({ msg: "Produto excluído com sucesso" });
        } catch (error) {
            return res.status(400).json({ msg: "Erro ao apagar produto " + error });
        }
    },




    //public routes    
    async read(req, res) {
        try {
            const product = await productModel.find();
            return res.status(200).json(product);
        } catch (err) {
            return res.status(400).json({ msg: "Erro " + err });
        }
    },
    async addFavorite(req, res) {
        const { userId } = req.body;
        const productId = req.params.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).json({ msg: "Erro! Faça login" });
        } else if (!productId) {
            return res.status(400).json({ msg: "Produto não existe" });
        }
        try {
            user.favoriteProduct.push(productId)
            await user.save();
            return res.status(200).json({ msg: "Adicionado aos favoritos com sucesso", user });
        } catch (error) {
            return res.status(400).json({ msg: "Erro ao adicionar ao favoritos " + error });
        }


    },

    async removeFavorite(req, res) {
        const { userId } = req.body;
        const productId = req.params.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).json({ msg: "Erro! Faça login" });
        } else if (!productId) {
            return res.status(400).json({ msg: "Produto não existe" });
        }
        try {
            user.favoriteProduct = user.favoriteProduct.filter(product => product.id !== productId);
            await user.save();
            return res.status(200).json({ msg: "Removido dos favoritos com sucesso", user })
        } catch (err) {
            return res.status(400).json({ msg: "Erro ao remover dos favoritos " + user });
        }
    },

    async readFavorites(req, res) {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ msg: "É preciso estar logado" });
        }
        const user = await userModel.findById(userId);
        return res.status(200).json(user.favoriteProduct);


    },
    async renderizarProduto(req, res) {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ msg: "É preciso estar logado" });
        }
        const user = await userModel.findById(userId);
        const favoriteProductsIds = user.favoriteProduct;
        const favoriteProducts = await productModel.find({
            _id: { $in: favoriteProductsIds }
        });
        return res.status(200).json(favoriteProducts);
    },

    async readOne(req, res) {
        const productId = req.params.id;
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(400).json({ msg: "Erro ao buscar o produto" });
        }
        return res.status(200).json(product);

    },
}