const userRouter = require("express").Router();

const { authentificate } = require("../../middleware/authentification");
const userController = require("./userController");

userRouter.post("/", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/reset-password", userController.resetUserPassword);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/user-account", authentificate, userController.getUserAccount);
userRouter.get("/logout", userController.logoutUser);

userRouter.get("/:userId", userController.getUserById);
userRouter.get(
  "/confirm-account/:registrationHash",
  userController.confirmUserAccount
);
userRouter.patch("/:userId", userController.makeUserInactive);
userRouter.delete("/:userId", userController.deleteUser);

module.exports = userRouter;
