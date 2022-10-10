const sequelize = require("../../database/dbConnect");
const { DataTypes } = require("sequelize");
const ExerciseTemplate = require("./exerciseTemplateModel");

const Exercise = sequelize.define("Exercise", {
  exerciseId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  series: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  repeats: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

Exercise.hasOne(ExerciseTemplate, {foreignKey: 'exerciseId'})

module.exports = Exercise;
