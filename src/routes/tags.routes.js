const {Router} = require("express"); 

const TagsController = require("../controllers/TagsController");

const tagsController = new TagsController();

const tagsRouter = Router();

tagsRouter.get("/:user_id", tagsController.index);

module.exports = tagsRouter;