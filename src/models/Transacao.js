const database = require("../database/database");

function insert(description, valor, owner, type) {
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

function selectAll(owner, callback) {
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

module.exports = {
    insert,
    selectAll
}