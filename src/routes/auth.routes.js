const express = require("express");
const router = express.Router();
const Usuario = require("../controllers/UsuarioController");

/**
 * Cria uma nova conta de usuario.
 */
router.post("/signup", (req, res) => {

    //! devido aos requisitos do projeto sobre a rota, estou usando o email como nome do usuario pois é só isso que e passado no corpo da requisição.

    const {
        email,
        password
    } = req.body;

    if (Usuario.isValido(email, email, password)) {
        Usuario.select(email, password, (row) => {
            if (row == undefined) {
                Usuario.insert(email, email, password);
                res.sendStatus(201);
            } else {
                res.sendStatus(409);
            }
        });
    } else {
        res.sendStatus(400);
    }

});

/**
 * Entra em uma conta existente caso não tenha nenhum usuário autenticado ainda.
 */
router.post("/login", (req, res) => {

    //? é a melhor forma de implementar essa autenticação?

    const {
        email,
        password
    } = req.body;

    if (req.session.owner != undefined || !Usuario.isValido(email, email, password)) {
        res.sendStatus(401);

    } else {
        Usuario.select(email, password, (row) => {
            if (row) {
                req.session.owner = row.uid;
                res.sendStatus(200);
            } else {
                res.sendStatus(401)
            }
        });
    }
});

/**
 * Encerra a sessão do usuário caso esse estaja autenticado.
 */
router.post("/logout", (req, res) => {
    if (req.session.owner != undefined) {
        req.session.owner = undefined;
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;