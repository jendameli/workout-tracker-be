const workoutService = require("./workoutService");

// Get all workouts regardless who created it
exports.getAllWorkouts = async (req, res, next) => {
  try {
    const allWorkouts = await workoutService.getAllWorkouts();
    return res
      .status(200)
      .json({ count: allWorkouts.length, data: allWorkouts });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Create a new workout - user has to be authorized
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

// Get all workouts from specified user via foreign key userId
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

// Get single workout by its PK workoutId
exports.getWorkoutById = async (req, res) => {
  const { workoutId } = req.params;
  if (!workoutId) {
    return res.status(400).json({ error: "Missing parameter workoutId" });
  }
  try {
    const workout = await workoutService.getWorkoutById(workoutId);
    return res.status(200).json({ data: workout });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
