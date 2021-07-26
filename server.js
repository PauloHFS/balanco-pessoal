const express = require("express");
const session = require("express-session");

const server = express();

const wallet_routes = require("./src/routes/wallet.routes");
const auth_routes = require("./src/routes/auth.routes");

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