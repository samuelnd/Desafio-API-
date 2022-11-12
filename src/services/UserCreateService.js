const {hash, compare} = require("bcryptjs");
const AppError = require("../utils/AppError"); 

class UserCreateService {
    constructor(userRepository) {
        this.userRepository = userRepository;    
    }
    async execute({name, email, password}){

        const  userWithUpdateEmail = await this.userRepository.findByEmail(email);

        if(!name) {
            throw new AppError("Informar o nome é obrigatório");
        }
        
        if (userWithUpdateEmail) {
            throw new AppError("Este email já está em uso!")
        }
        
        const hashedPassword = await hash(password, 8);

        const userCreated = await this.userRepository.create({name, email, password: hashedPassword});

        return userCreated;
    }
}

module.exports = UserCreateService;