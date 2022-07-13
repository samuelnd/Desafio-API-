require("express-async-errors");

const express = require('express');
const database = require("./database/sqlite");
const routes = require('./routes');
const AppError = require('./utils/AppError');

const app = express();
app.use(express.json());
app.use(routes);

database();

app.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "Error",
            message: error.message
        });
    }

    return response.status(500).json({
        status: "Error",
        message: "Internal Server Error",
    });
});

const PORT = 3333;

app.listen(PORT, () => console.log( `Boa, parece que ta funcionando o server na porta ${PORT}`));