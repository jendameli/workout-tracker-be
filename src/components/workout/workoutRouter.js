const workoutRouter = require("express").Router();

const { authentificate } = require("../../middleware/authentification");
const workoutController = require("./workoutController");

workoutRouter
  .get("/", workoutController.getAllWorkouts)
  .post("/", authentificate, workoutController.createWorkout);
workoutRouter.get(
  "/user/:userId",
  authentificate,
  workoutController.getWorkoutsByUserId
);
workoutRouter.delete(
  "/:workoutId",
  authentificate,
  workoutController.deleteWorkout
);

module.exports = workoutRouter;
