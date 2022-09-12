const userRouter = require("express").Router();

const userController = require("./userController");

userRouter.get("/", userController.getAllUsers);
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/:userId", userController.getUserById);

module.exports = userRouter;
