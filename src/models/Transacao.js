const database = require("../database/database");

/**
 * Insere uma nova transação no banco de dados.
 * 
 * @param {String} description Descrição da transação.
 * @param {Number} valor Valor da transação.
 * @param {Number} owner uid do proprietário da transação.
 * @param {Number} type Tipo da transação, sendo 1 para GASTO e 2 para RENDA.
 */
function insert(description, valor, owner, type) {

    //TODO: mudar a forma de tratar o erro do databse, se possivel, em vez que apenas informa-lo no console.

    database.run(`
        INSERT INTO transacoes (
            description,
            valor,
            owner,
            type
        ) VALUES (
            "${description}",
            "${valor}",
            "${owner}",
            "${type}"
        );`,
        (err) => {
            if (!err) {
                console.log("SQLITE: Transação cadastrada na tabela!");
            } else {
                console.error(err);
            }
        }
    );
}

/**
 * Seleciona todas as transações no banco de dados a partir do id do proprietário.
 * Aceita uma função callback que permite tratar as transações.
 * 
 * @param {Number} owner uid do proprietário, chave primaria do usuário no banco de dados.
 * @param {function} callback função que recebe todas as transações do proprietário como parametro.
 */
function selectAll(owner, callback) {

    //TODO: mudar a forma de tratar o erro do database, se possivel, em vez que apenas informa-lo no console.

    database.all(`
            SELECT * FROM transacoes
            WHERE owner = "${owner}";
        `,
        (err, rows) => {
            if (err) {
                console.error(err);
            } else {
                callback(rows)
            }
        }
    );
}

function isValida(description, valor) {
    let isValida = false;

    let isUndefined = description == undefined || valor == undefined;
    let isNull = description == null || valor == null;

    if (!isUndefined && !isNull) {
        isValida = true;
    }

    return isValida;
}

module.exports = {
    insert,
    selectAll,
    isValida
}