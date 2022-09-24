const { DataTypes } = require("sequelize");
const sequelize = require("../../database/dbConnect");
const Workout = require("../workout/workoutModel");

const User = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    // Catch SequelizeUniqueConstraintError if not unique
    unique: true,
  },
  age: {
    type: DataTypes.INTEGER,
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

User.hasMany(Workout, { foreignKey: "userId" });

module.exports = User;
