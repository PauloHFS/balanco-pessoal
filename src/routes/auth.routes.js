const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");

/**
 * Cria uma nova conta de usuario.
 * 
 * TODO: identificar situações que podem ocorrer erros e trata-los
 * ? deve retornar 201 em toda ocasião?
 */
router.post("/signup", (req, res) => {
    const {
        email,
        password
    } = req.body;

    Usuario.insert(email, email, password);

    res.sendStatus(201);
});

/**
 * Entra em uma conta existente.
 * 
 * TODO: identificar situações que podem ocorrer erros e trata-los
 */
router.post("/login", (req, res) => {
    const {
        email,
        password
    } = req.body;

    Usuario.select(email, password, (row) => {
        if (row) {
            req.session.owner = row.uid;
            res.sendStatus(200);
        } else {
            res.sendStatus(401)
        }
    });
});

module.exports = router;