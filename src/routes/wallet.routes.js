const express = require("express");
const TransacaoController = require("../controllers/TransacaoController");

const router = express.Router();

/**
 * Verifica se o proprietário da sessão está definido na requisição.
 * 
 * @param {*} req A requisição.
 * @returns true se estiver definido, false se não.
 */
function isAuthenticado(req) {
    return req.session.owner != undefined
}

/**
 * Resolve a requisição com base na autenticação do usuário.
 * 
 * @param {*} req
 * @param {*} res 
 * @param {Function} callback Função a ser executada caso o usuário esteja autenticado.
 */
function checarReq(req, res, callback) {
    if (!isAuthenticado(req)) {
        res.sendStatus(401);
    } else {
        callback();
    }
}

/**
 * Processa a transação.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {Number} tipo Tipo da transação, 1 para gasto e 2 para renda. 
 */
function processarTransacao(req, res, tipo) {
    const {
        descrição,
        valor
    } = req.body;

    if (TransacaoController.isValida(descrição, valor)) {
        TransacaoController.insert(descrição, valor, req.session.owner, tipo);
        res.sendStatus(201);
    } else {
        res.sendStatus(401);
    }
}

/**
 * Retorna todos os gastos do usuário.
 */
router.get("/", (req, res) => {
    checarReq(req, res, () => {
        TransacaoController.selectAll(req.session.owner, (data) => {
            res.status(200);
            res.send(data);
        });
    });
});

/**
 * Adiciona uma nova renda ao usuário.
 */
router.post("/deposit", (req, res) => {
    checarReq(req, res, () => {
        processarTransacao(req, res, 2)
    });
});

/**
 * Adiciona um novo gasto ao usuário.
 */
router.post("/withdraw", (req, res) => {
    checarReq(req, res, () => {
        processarTransacao(req, res, 1)
    });
});

module.exports = router;