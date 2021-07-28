const express = require("express");
const session = require("express-session");

const server = express();

//Definindo as rotas da apalicação.
const wallet_routes = require("./src/routes/wallet.routes");
const auth_routes = require("./src/routes/auth.routes");

//configurando o servidor e suas rotas e executando-o na porta 3333.
server.use(session({
        secret: "don't trust, verify!",
        resave: true,
        saveUninitialized: true
    }))
    .use(express.json())
    .use("/auth", auth_routes)
    .use("/wallet", wallet_routes)
    .listen(3333, () => {
        console.log("Servidor está funcionando");
    });