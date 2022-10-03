const { DataTypes } = require("sequelize");
const sequelize = require("../../database/dbConnect");
const Exercise = require("../exercise/exerciseModel");
const WorkoutWithExercise = require("./workoutWithExercises");

const Workout = sequelize.define("Workout", {
  workoutId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  workoutName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  workoutRating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  workoutStartTime: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  workoutEndTime: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  isWorkoutPublic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  isWorkoutActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isWorkoutFinished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Workout.belongsToMany(Exercise, {
  through: WorkoutWithExercise,
  foreignKey: "workoutId",
});
Exercise.belongsToMany(Workout, {
  through: WorkoutWithExercise,
  foreignKey: "exerciseId",
});

module.exports = Workout;
