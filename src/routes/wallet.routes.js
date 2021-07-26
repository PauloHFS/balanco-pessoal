const express = require("express");
const Transacao = require("../models/Transacao");

const router = express.Router();

/**
 * Retorna todos os gastos do usuário.
 * 
 * TODO: tratar situações que podem gerar erros e tratar esses erros.
 * ? está retornando codigo 200 em toda possibilidade?
 */
router.get("/", (req, res) => {
    Transacao.selectAll(req.session.owner, (data) => {
        res.status(200)
        res.send(data);
    })
});

/**
 * Adiciona uma nova renda ao usuário.
 * 
 * TODO: identificar situações que podem ocorrer erros e trata-los
 * ? deve retornar 201 em toda ocasião?
 */
router.post("/deposit", (req, res) => {
    const {
        descrição,
        valor
    } = req.body;

    Transacao.insert(descrição, valor, req.session.owner, 2);

    res.sendStatus(201);

});

/**
 * Adiciona um novo gasto ao usuário.
 * 
 * TODO: identificar situações que podem ocorrer erros e trata-los
 * ? deve retornar 201 em toda ocasião?
 */
router.post("/withdraw", (req, res) => {
    const {
        descrição,
        valor
    } = req.body;

    Transacao.insert(descrição, valor, req.session.owner, 1);

    res.sendStatus(201);

});

module.exports = router;