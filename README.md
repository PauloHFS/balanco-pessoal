# Balanço Pessoal
Rest API de balanço patrimonial simplificado e pessoal.

Este é um projeto desenvolvido para avaliação na fase 2 do processo seletivo do Projeto TED 9910/2020. 

##### Rotas da API

|       Rota       |                          Descrição                           |
| :--------------: | :----------------------------------------------------------: |
|   /auth/login    | Rota utliziada pra autenticar o usuário. <br />Recebe e-mail e senha no corpo da requisição. |
|   /auth/signup   | Realiza o cadastro de um novo usuário.<br />Recebe e-mail e senha no corpo da requisição. |
|     /wallet      | Exibe todas as transações de gasto e de renda do usuário autenticado.<br />É necessário está autenticado para fazer requisições nesta rota. |
| /wallet/deposit  | Registra um novo gasto na wallet do usuário autenticado.<br />Recebe a descrição e o valor do gasto no corpo da requisição.<br />É necessário está autenticado para fazer requisições nesta rota. |
| /wallet/withdraw | Registra uma nova renda na wallet do usuário autenticado.<br />Recebe a descrição e o valor da renda no corpo da requisição.<br />É necessário está autenticado para fazer requisições nesta rota. |

