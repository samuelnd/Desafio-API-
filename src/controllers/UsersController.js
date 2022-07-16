const {hash, compare} = require("bcryptjs");

const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");

class UsersController {
    async create(request, response) { 
        const {name, email, password} = request.body;

        const database =await sqliteConnection();
        const  userWithUpdateEmail = await database.get("SELECT * FROM users WHERE email =(?)", [email]);

        if(!name) {
            throw new AppError("Informar o nome é obrigatório");
        }
        
        if (userWithUpdateEmail) {
            throw new AppError("Este email já está em uso!")
        }
        
        const hashedPassword = await hash(password, 8);

        await database.run("INSERT INTO users(name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
        console.log("chega aqui");
        return response.status(201).json();
    }

    async update(request, response) { 
        const {name, email, password, old_password} = request.body; 
        const {id} = request.params;

        const database = await sqliteConnection();
        console.log(name, email, password);
        const userExists = await database.get("SELECT * FROM users WHERE id =(?)", [id]);

        if( !userExists) {
            throw new AppError("Usuário não existe");
        }

        const checkEmailExists = await database.get("SELECT * FROM users WHERE email =(?)", [email]);

        if (checkEmailExists && checkEmailExists.id !== userExists.id) {
            throw new AppError("Esse email já está em uso, tente novamente.");
        }

        userExists.name = name ?? userExists.name;
        userExists.email = email ?? userExists.email;

        if(password && !old_password) {
            throw new AppError("Necessário informar senha atual.");
        }

        if(password && old_password){
            const checkPassword = await compare(old_password, userExists.password);

            if(!checkPassword) {
                throw new AppError("Senha atual não confere");
            }
        }

        userExists.password = await hash(password, 8);
        await database.run("UPDATE users SET name= ?, email = ?, password = ?, updated_at = DATETIME('now') WHERE id = ?", [userExists.name, userExists.email, userExists.password, id]);




        
        
        return response.json();
        
    }

}

module.exports = UsersController;