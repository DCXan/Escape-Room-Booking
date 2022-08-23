const express = require("express");
const userRouter = express.Router();

const UserController = require("../controllers/user");
const checkAuth = require("../middleware/check-auth");

userRouter.post("/signup", UserController.user_signup);

userRouter.post("/login", UserController.user_login);
userRouter.get("/get-users", UserController.user_getUsers);

userRouter.delete("/:userId", UserController.user_delete);

module.exports = userRouter;
