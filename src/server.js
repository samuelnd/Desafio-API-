require("dotenv/config");
require("express-async-errors");

const express = require('express');
const database = require("./database/sqlite");


const routes = require('./routes');
const AppError = require('./utils/AppError');
const uploadConfig = require("./configs/upload");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(cors());
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

const PORT =  process.env.PORT || 3000;

app.listen(PORT, () => console.log( `Server is running on Port ${PORT}`));