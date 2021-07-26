const express = require("express");
const router = express.Router();
const Transacao = require("../models/Transacao");

/**
 * Retorna todos os gastos do usuário.
 */
router.get("/", (req, res) => {
    Transacao.selectAll(req.session.owner, (data) => {
        res.status(200)
        res.send(data);
    })
});

/**
 * Adiciona uma nova renda ao usuário.
 */
router.post("/deposit", (req, res) => {
    const {
        descrição,
        valor
    } = req.body;

    Transacao.insert(descrição, valor, req.session.owner, 1);

    res.sendStatus(201);

});

/**
 * Adiciona um novo gasto ao usuário.
 */
router.post("/withdraw", (req, res) => {
    const {
        descrição,
        valor
    } = req.body;

    Transacao.insert(descrição, valor, req.session.owner, 2);

    res.sendStatus(201);

});

module.exports = router;