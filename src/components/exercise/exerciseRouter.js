const exerciseRouter = require("express").Router();

const { authentificate } = require("../../middleware/authentification");
const exerciseController = require("./exerciseController");

exerciseRouter.get("/", exerciseController.getAllExercises);
exerciseRouter.post("/", authentificate, exerciseController.createExercise);
exerciseRouter.get(
  "/user/",
  authentificate,
  exerciseController.getExercisesByUser
);
exerciseRouter.get(
  "/:exerciseId",
  authentificate,
  exerciseController.getExerciseById
);
exerciseRouter.delete(
  "/:exerciseId",
  authentificate,
  exerciseController.deleteExercise
);

module.exports = exerciseRouter;
