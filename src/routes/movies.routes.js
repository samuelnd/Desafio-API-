const {Router} = require("express");

const MoviesNotesController = require("../controllers/MoviesNotesController");

const moviesNotesController = new MoviesNotesController();

const moviesRoutes = Router();

moviesRoutes.post("/:user_id", moviesNotesController.create);
moviesRoutes.get("/:id", moviesNotesController.show);
moviesRoutes.delete("/:id", moviesNotesController.delete);
moviesRoutes.get("/", moviesNotesController.index);

module.exports = moviesRoutes;