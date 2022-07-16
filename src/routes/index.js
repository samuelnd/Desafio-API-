const {Router} = require("express");

const routes = Router();
const userRoutes = require("./user.routes");
const moviesRoutes = require("./movies.routes");

routes.use("/users", userRoutes);
routes.use("/movies", moviesRoutes);

module.exports = routes;