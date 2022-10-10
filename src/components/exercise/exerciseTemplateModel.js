const sequelize = require("../../database/dbConnect");
const { DataTypes } = require("sequelize");

const ExerciseTemplate = sequelize.define("ExerciseTemplate", {
  exerciseTemplateId: {
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
  isExercisePublic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = ExerciseTemplate;
