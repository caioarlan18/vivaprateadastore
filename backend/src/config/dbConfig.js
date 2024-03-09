const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbConfig = `mongodb+srv://${dbUser}:${dbPass}@cluster0.sxejjry.mongodb.net/vivaPrateada?retryWrites=true&w=majority&appName=Cluster0`;
const connect = async () => {
    try {
        await mongoose.connect(dbConfig);
        console.log("Conectado ao banco de dados");
    } catch (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
    }
};

connect();

module.exports = connect;