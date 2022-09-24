const Workout = require("./workoutModel");
const User = require("../user/userModel");

exports.getAllWorkouts = async () => {
  try {
    return await Workout.findAll();
  } catch (error) {
    throw error;
  }
};

exports.createWorkout = async (workoutData) => {
  try {
    await Workout.create(workoutData);
  } catch (error) {
    throw error;
  }
};

exports.getWorkoutsByUserId = async (userId) => {
  try {
    return await Workout.findAll(
      { attributes: ["workoutId", "name", "rating", "createdAt"] },
      { where: { userId } }
    );
  } catch (error) {
    throw error;
  }
};
