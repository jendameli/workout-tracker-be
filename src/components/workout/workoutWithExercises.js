const sequelize = require("../../database/dbConnect");

const WorkoutWithExercise = sequelize.define(
  "WorkoutWithExercise",
  {},
  { timestamps: false }
);

module.exports = WorkoutWithExercise;
