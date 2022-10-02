const exerciseRouter = require("express").Router();

const { authentificate } = require("../../middleware/authentification");
const exerciseController = require("./exerciseController");

exerciseRouter.get("/", exerciseController.getAllExercises);
exerciseRouter.post("/", authentificate, exerciseController.createExercise);

module.exports = exerciseRouter;
