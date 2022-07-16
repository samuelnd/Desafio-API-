const {Router} = require("express");

const routes = Router();
const userRoutes = require("./user.routes");
const moviesRoutes = require("./movies.routes");
const tagsRoutes = require("./tags.routes");

routes.use("/users", userRoutes);
routes.use("/movies", moviesRoutes);
routes.use("/tags", tagsRoutes);

module.exports = routes;