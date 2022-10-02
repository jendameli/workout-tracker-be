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
    unique: true,
  },
  workoutRating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  workoutStartTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  workoutEndTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  isWorkoutPublic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  isWorkoutFinished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Workout.belongsToMany(Exercise, { through: WorkoutWithExercise });
Exercise.belongsToMany(Workout, { through: WorkoutWithExercise });

module.exports = Workout;
