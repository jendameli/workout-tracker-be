const sequelize = require("../../database/dbConnect");

const WorkoutWithExercise = sequelize.define("WorkoutWithExercise");

module.exports = WorkoutWithExercise;
