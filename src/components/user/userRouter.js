const userRouter = require("express").Router();

const userController = require("./userController");

userRouter
  .get("/", userController.getAllUsers)
  .post("/", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/:userId", userController.getUserById);
userRouter.get(
  "/confirm-account/:registrationHash",
  userController.confirmUserAccount
);

module.exports = userRouter;
