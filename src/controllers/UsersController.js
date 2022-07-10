const {hash, compare} = require("bcryptjs");

class UsersController {
async create(request, response) {
    const {name, email, password} = request.body;

    const hashedPassword = await hash(password, 8);

    response.status(201).json({name, email, hashedPassword});
}

async update(request, response) { 
    const {name, email, password} = request.body;

    response.status(201).json({name, email, password});
    
}

}

module.exports = UsersController;