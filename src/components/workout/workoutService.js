const Workout = require("./workoutModel");
const User = require("../user/userModel");

exports.getAllWorkouts = async () => {
  try {
    return await Workout.findAll();
  } catch (error) {
    throw error;
  }
};

// create workout
exports.createWorkout = async (workoutData) => {
  try {
    await Workout.create(workoutData);
  } catch (error) {
    throw error;
  }
};

// Gets all workouts form specific user
exports.getWorkoutsByUserId = async (userId) => {
  try {
    return await Workout.findAll(
      {
        attributes: ["workoutId", "workoutName", "workoutRating", "createdAt"],
      },
      { where: { userId } }
    );
  } catch (error) {
    throw error;
  }
};

// Get workout by its PK
exports.getWorkoutById = async (workoutId) => {
  try {
    const workout = Workout.findOne({ where: { workoutId } });
    if (!workout) {
      throw new Error("No workout found!");
    }
    return workout;
  } catch (error) {
    throw error;
  }
};

// Delete workout according to provided workoutId
exports.deleteWorkout = async (workoutId, userId) => {
  try {
    const workout = await Workout.findByPk(workoutId);
    if (!workout) {
      throw new Error("No workout found!");
    }
    if (workout.userId !== userId) {
      throw new Error('You dont have permission to delete this workout');
    }
    await Workout.destroy({ where: { workoutId } });
  } catch (error) {
    throw error;
  }
};
