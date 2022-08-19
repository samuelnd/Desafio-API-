const {verify} = require("jsonwebtoken");
const {AppError} = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("JWT token is required", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const {sub: user_id} = verify(token, authConfig.jwt.secret);


        request.user = {
            id: Number(user_id)
        }

        return next();
    } catch {
        throw new AppError("JWT token invalid", 401);
    }
}

module.exports = ensureAuthenticated;