const database = require("../database/database");

function insert(name, email, password) {
    database.run(`
        INSERT INTO usuarios (
            name,
            email,
            password
        ) VALUES (
            "${name}", 
            "${email}", 
            "${password}"
        );`,
        (err) => {
            if (!err) {
                console.log("SQLITE: Usuario cadastrado na tabela!");
            } else {
                console.error(err);
            }
        }
    );
}

function select(email, password, callback) {
    database.get(`
        SELECT * FROM usuarios
        WHERE email = "${email}"
        AND password = "${password}";`,
        (err, row) => {
            if (err) {
                console.error(err.message);
            } else {
                callback(row);  
            }
        }
    );
}

module.exports = {
    insert,
    select
}