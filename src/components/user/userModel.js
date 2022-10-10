const { DataTypes } = require("sequelize");
const sequelize = require("../../database/dbConnect");
const Exercise = require("../exercise/exerciseModel");
const ExerciseTemplate = require("../exercise/exerciseTemplateModel");
const Workout = require("../workout/workoutModel");

const User = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    // Catch SequelizeUniqueConstraintError if not unique
    unique: true,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  registrationHash: {
    type: DataTypes.STRING,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isActivated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(ExerciseTemplate, { foreignKey: "userId" });
User.hasMany(Workout, { foreignKey: "userId" });
User.hasMany(Exercise, { foreignKey: "userId" });

module.exports = User;
