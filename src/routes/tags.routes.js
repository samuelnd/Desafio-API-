const {Router} = require("express"); 

const TagsController = require("../controllers/TagsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const tagsController = new TagsController();

const tagsRouter = Router();

tagsRouter.get("/", ensureAuthenticated, tagsController.index);

module.exports = tagsRouter;