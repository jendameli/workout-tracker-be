const sequelize = require("../../database/dbConnect");
const { DataTypes } = require("sequelize");

const Exercise = sequelize.define("Exercise", {
  exerciseId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  exerciseName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  exerciseBodyPart: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exerciseEquipment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exerciseMuscles: {
    type: DataTypes.STRING,
  },
  exerciseRepeats: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  exerciseWeight: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  exerciseStartTime: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  exerciseEndTime: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  isExercisePublic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = Exercise;
