const sqlite3 = require("sqlite3").verbose();

/**
 * Váriavel que recebe a instância do banco de dados.
 * Cria um novo aquivo de banco de dados se este não existir.
 * Executa dois comandos sql se a conecção for bem sucedida.
 * 
 * TODO: tratar os erros de uma forma melhor se possivel, em vez de apenas lança-los no console.
 */
let database = new sqlite3.Database(__dirname + "/balanco.sqlite",
    (err) => {
        if (!err) {
            console.log("SQLITE: Conectado ao banco de dados.");
            //Cria a tabela de usuários.
            database.run(`
                CREATE TABLE IF NOT EXISTS usuarios (
                uid INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT,
                password TEXT
                );`,
                    (err) => {
                        if (!err) {
                            "SQLITE: Tabela de Usuários criada."
                        } else {
                            console.error("SQLITE: Não foi possivel criar a tabela de Usuários.\n" + err)
                        }
                    })
                //Cria a tabela de transações.
                .run(`
                    CREATE TABlE IF NOT EXISTS transacoes (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    description TEXT,
                    valor REAL,
                    owner INTEGER,
                    type INTEGER,
                    FOREIGN KEY(owner) REFERENCES usuarios(uid)
                    );`,
                    (err) => {
                        if (!err) {
                            "SQLITE: Tabela de Transações criada."
                        } else {
                            console.error("SQLITE: Não foi possivel criar a tabela de Transações.\n" + err)
                        }
                    });

        } else {
            console.error(err.message);
        }
    });

module.exports = database;