const {Router} = require("express");

const UsersController = require("../controllers/UsersController");

const UserAvatarController = require("../controllers/UserAvatarController");

const multer = require("multer");

const uploadConfig = require("../configs/upload");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();


const userRoutes = Router();

userRoutes.post("/", ensureAuthenticated, usersController.create);
userRoutes.put("/", ensureAuthenticated, usersController.update);
userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

module.exports = userRoutes;

