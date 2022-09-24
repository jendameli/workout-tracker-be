const workoutService = require("./workoutService");

exports.getAllWorkouts = async (req, res, next) => {
  try {
    const allWorkouts = await workoutService.getAllWorkouts();
    return res
      .status(200)
      .json({ workoutLength: allWorkouts.length, data: allWorkouts });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.createWorkout = async (req, res) => {
  const newWorkout = req.body;
  try {
    newWorkout.userId = req.user.userId;
    await workoutService.createWorkout(newWorkout);
    return res.status(200).json({ message: "New workout created" });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

exports.getWorkoutsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const workouts = await workoutService.getWorkoutsByUserId(parseInt(userId));
    return res
      .status(200)
      .json({ numberOfWorkouts: workouts.length, data: workouts });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};


