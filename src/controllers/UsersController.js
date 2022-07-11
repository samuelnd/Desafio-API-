const {hash, compare} = require("bcryptjs");

const sqliteConnection = require("../database/sqlite");

class UsersController {
async create(request, response) {
    const {name, email, password} = request.body;

    const hashedPassword = await hash(password, 8);
    const database = await sqliteConnection();

    database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);

    response.status(201).json({name, email, hashedPassword});
}

async update(request, response) { 
    const {name, email, password} = request.body;

    response.status(201).json({name, email, password});
    
}

}

module.exports = UsersController;