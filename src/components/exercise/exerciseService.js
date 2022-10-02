const Exercise = require("./exerciseModel");

const { BODY_PARTS, EQUIPMENT } = require("./exerciseConfig");

exports.getAllExercises = async () => {
  try {
    return await Exercise.findAll();
  } catch (error) {
    throw error;
  }
};

exports.createExercise = async (userData) => {
  try {
    await Exercise.create(userData);
  } catch (error) {
    throw error;
  }
};


