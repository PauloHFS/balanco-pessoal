const express = require("express");

const server = express();

const wallet_routes = require("./src/routes/wallet.routes");
const auth_routes = require("./src/routes/auth.routes");


server.get("/", (req, res) => {
    res.send("Servidor está funcionando");
});

server.use(express.json())
    .use("/auth", auth_routes)
    .use("/wallet", wallet_routes)
    .listen(3333, () => {
        console.log("Servidor está funcionando");
    });