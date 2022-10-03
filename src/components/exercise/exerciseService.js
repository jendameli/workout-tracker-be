const Exercise = require("./exerciseModel");

const { BODY_PARTS, EQUIPMENT } = require("./exerciseHelper");

exports.getAllExercises = async () => {
  try {
    const exercises = await Exercise.findAll();
    return exercises;
  } catch (error) {
    throw error;
  }
};

exports.getExercisesByUser = async (userId) => {
  try {
    const exercisesByUser = await Exercise.findAll({ where: { userId } });
    return exercisesByUser;
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

exports.getExerciseById = async (exerciseId) => {
  try {
    const exercise = await Exercise.findByPk(exerciseId);
    if (!exercise) {
      throw new Error("No exercise found!");
    }
    return exercise;
  } catch (error) {
    throw error;
  }
};

exports.deleteExercise = async (exerciseId, userId) => {
  try {
    const exercise = await Exercise.findByPk(exerciseId);
    if (!exercise) {
      throw new Error("No exercise found!");
    }
    if (userId !== exercise.userId) {
      throw new Error("You are not allowed to delete this exercise");
    }
    await Exercise.destroy({where: {exerciseId}});
  } catch (error) {
    throw error;
  }
};
