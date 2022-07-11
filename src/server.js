const express = require('express');

const database = require("./database/sqlite");

const routes = require('./routes');

const app = express();
app.use(express.json());

database();
app.use(routes);

const PORT = 3333;

app.listen(PORT, () => console.log( `Boa, parece que ta funcionando o server na porta ${PORT}`));