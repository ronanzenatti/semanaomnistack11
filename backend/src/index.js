const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(3333);






/**
 *  Rota / Recurso
 */

/**
 *  METODOS HTTP:
 *
 *  GET
 *  POST
 *  PUT
 *  DELETE
 */

/**
 *  Tipos de parâmetros:
 *  Query -> Parâmetros nomeados enviados na rota após ?
 *  Route -> Parâmetros utilizados para identificar recursos
 *  Request Body -> Corpo da requisição
 */

/**
 * SQL:
 * NoSQL: MongoDB, CouchDB
 */

/**
 * Driver: SELECT * FROM users/
 * Query Builder: table('users').select('*').where();
 */
