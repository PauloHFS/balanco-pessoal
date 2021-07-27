

# Balanço Pessoal

Rest API de balanço patrimonial simplificado e pessoal.

Este é um projeto desenvolvido para avaliação na fase 2 do processo seletivo do Projeto TED 9910/2020. 

#### Primeiros Passos

1. Clone o repositório e acesse o diretório **balanco-pessoal**.
2. Execute no terminal:
   1. **`yarn` ** **Este comando irá instalar todas as dependência do projeto.*
   2. **`yarn start` ** **Este comando irá executar o servidor*

*Obs: As requesições que utilizei para testar a API no Insomnia pode ser encontrada [aqui](https://gist.github.com/PauloHFS/835bec88e0ea02ba5ebcfad5a7c3a0ba). Basta importar elas.*

#### Rotas da API

|       Rota       |                          Descrição                           | Corpo da Requisição (JSON)                                |
| :--------------: | :----------------------------------------------------------: | --------------------------------------------------------- |
|   /auth/login    | Rota utliziada pra autenticar o usuário. <br />Recebe e-mail e senha no corpo da requisição. | `{"email": "exemplo@exemplo.com", "password": "exemplo"}` |
|   /auth/signup   | Realiza o cadastro de um novo usuário.<br />Recebe e-mail e senha no corpo da requisição. | `{"email": "exemplo@exemplo.com", "password": "exemplo"}` |
|     /wallet      | Exibe todas as transações de gasto e de renda do usuário autenticado.<br />É necessário está autenticado para fazer requisições nesta rota. |                                                           |
| /wallet/deposit  | Registra uma nova renda na wallet do usuário autenticado.<br />Recebe a descrição e o valor da renda no corpo da requisição.<br />É necessário está autenticado para fazer requisições nesta rota. | `{"descrição": "exemplo de renda", "valor": 150}`         |
| /wallet/withdraw | Registra um novo gasto na wallet do usuário autenticado.<br />Recebe a descrição e o valor do gasto no corpo da requisição.<br />É necessário está autenticado para fazer requisições nesta rota. | `{"descrição": "exemplo de gasto", "valor": 150}`         |

#### Tabelas do banco de dados

##### Usuários

| Atributo | Descrição                                                    |
| :------: | :----------------------------------------------------------- |
|   uid    | Chave primária, sendo um número único que identifica cada usuário cadastrado no sistema. |
|   name   | Nome do Usuário                                              |
|  email   | E-mail do Usuário, é utilizado para autentica-lo.            |
| password | Senha o Usuário, é utilizado para autentica-lo.              |

##### Transações

|  Atributo   | Descrição                                                    |
| :---------: | ------------------------------------------------------------ |
|     id      | Chave primária, sendo um número único que identifica cada transação cadastrada no sistema. |
| description | Descrição da transação.                                      |
|    valor    | Valor na unidade monetária desejada.                         |
|    owner    | Chave estrangeira vinculada ao *uid* da tabela de usuários, sendo um numero único de usuário que o vicula a transação. |
|    type     | Número que identifica o tipo de transação, sendo 1 para gasto e 2 para renda. |

