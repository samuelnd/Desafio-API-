const {Router} = require("express");

const routes = Router();
const userRoutes = require("./user.routes");
const moviesRoutes = require("./movies.routes");
const tagsRoutes = require("./tags.routes");
const sessionsRoutes = require("./sessions.routes");

routes.use("/users", userRoutes);
routes.use("/movies", moviesRoutes);
routes.use("/tags", tagsRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;