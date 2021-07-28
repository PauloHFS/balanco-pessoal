const database = require("../database/database");

/**
 * Insere um novo Usuário no banco de dados.
 * 
 * @param {String} name Nome do Usuário.
 * @param {String} email E-mail do Usuário.
 * @param {String} password Password do Usuário.
 */
function insert(name, email, password) {

    //TODO: mudar a forma de tratar o erro do databse, se possivel, em vez que apenas informa-lo no console.

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

/**
 * Seleciona usuário que possui o e-mail e senha passado por parametro.
 * @param {String} email E-mail do Usuário.
 * @param {String} password Password do Usuário.
 * @param {function} callback Função callback que recebe os dados do usuário por parametros se este estiver cadastrado no banco de dados, e undefined se não.
 */
function select(email, password, callback) {

    //TODO: mudar a forma de tratar o erro do database, se possivel, em vez que apenas informa-lo no console.

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

/**
 * Verifica se os dados são validos para a criação de um novo usuário.
 * A validade depende da regra de negócio.
 * 
 * @param {String} name Nome do Usuário
 * @param {String} email Email do Usuário
 * @param {String} password Senha do Usuário
 * @returns true se for valido, false se não.
 */
function isValido(name, email, password) {
    let isValido = false;

    //verifica se algum parametro é undefined
    let isUndefined = name == undefined || email == undefined || password == undefined;
    //verifica se algum parametro é nulo
    let isNull = name == null || email == null || email == null;

    if (!isUndefined && !isNull) {
        isValido = true;
    }

    return isValido;
}

module.exports = {
    insert,
    select,
    isValido
}