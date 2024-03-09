const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
module.exports = {

    async register(req, res) {
        const { name, email, password, role } = req.body;
        const userExists = await userModel.findOne({ email: email })
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Faltando dados" });
        }
        else if (!email.includes('@') || email.length < 10) {
            return res.status(400).json({ msg: 'Coloque um email válido' })
        }
        else if (userExists) {
            return res.status(400).json({ msg: 'Esta conta já existe' })
        }

        try {
            const user = await userModel.create({
                name,
                email,
                password,
                role
            })
            return res.status(200).json({ msg: 'Conta criada com sucesso', user });
        } catch (err) {
            return res.status(400).json({ msg: "Erro ao criar conta " + err });
        }
    },


    async login(req, res) {
        const { email, password } = req.body;
        const user = await userModel.findOne({
            email: email,
            password: password
        });
        const secret = process.env.SECRET;
        if (!email || !password) {
            return res.status(401).json({ msg: "Dados faltando" });
        } else if (!user) {
            return res.status(400).json({ msg: "Esta conta não existe" });
        }
        try {
            const token = jwt.sign({
                id: user._id
            }, secret);
            return res.status(200).json({ msg: "Logado com sucesso", token, id: user._id });
        } catch (err) {
            return res.statys(400).json({ msg: "Falha ao logar " + err });
        }
    },

    async checkToken(req, res, next) {
        const token = req.headers['x-access-token'];
        const secret = process.env.SECRET;
        if (!token) {
            return res.status(401).json({ msg: 'Acesso negado' })
        }
        try {
            jwt.verify(token, secret)
            next()
        } catch (err) {
            return res.status(401).json({ msg: 'Token inválido' })
        }
    },

    async logged(req, res) {
        const id = req.params.id
        const user = await userModel.findOne({ _id: id }, '-password')
        if (!user) {
            return res.status(401).json({ msg: 'Acesso negado' })
        }
        return res.status(200).json(user)

    }


}