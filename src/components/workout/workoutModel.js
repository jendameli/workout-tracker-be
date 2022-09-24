const { DataTypes } = require("sequelize");
const sequelize = require("../../database/dbConnect");
const User = require("../user/userModel");

const Workout = sequelize.define("workout", {
  workoutId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Workout;
