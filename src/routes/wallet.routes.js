const express = require("express");
const Transacao = require("../models/Transacao");

const router = express.Router();

/**
 * Retorna todos os gastos do usuário.
 */
router.get("/", (req, res) => {
    if (req.session.owner != undefined) {
        Transacao.selectAll(req.session.owner, (data) => {
            res.status(200)
            res.send(data);
        });
    } else {
        res.sendStatus(400);
    }
});

/**
 * Adiciona uma nova renda ao usuário.
 */
router.post("/deposit", (req, res) => {
    const {
        descrição,
        valor
    } = req.body;

    if (req.session.owner != undefined && Transacao.isValida(descrição, valor)) {
        Transacao.insert(descrição, valor, req.session.owner, 2);
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
});

/**
 * Adiciona um novo gasto ao usuário.
 */
router.post("/withdraw", (req, res) => {
    const {
        descrição,
        valor
    } = req.body;

    if (req.session.owner != undefined && Transacao.isValida(descrição, valor)) {
        Transacao.insert(descrição, valor, req.session.owner, 1);
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;