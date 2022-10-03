const exerciseService = require("./exerciseService");

// Get all saved exercises
exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await exerciseService.getAllExercises();
    return res.status(200).json({ count: exercises.length, data: exercises });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

// Get all exercises from user
exports.getExercisesByUser = async (req, res) => {
  const userId = req.user.userId;
  try {
    const exercisesByUser = await exerciseService.getExercisesByUser(userId);
    return res
      .status(200)
      .json({ count: exercisesByUser.length, data: exercisesByUser });
  } catch (error) {
    return res.status(400).json({ error: error.message || error });
  }
};

// Create a new exercise
exports.createExercise = async (req, res) => {
  const userData = req.body;
  try {
    if (!userData.exerciseName) {
      throw new Error("Missing exercise name parameter");
    }
    userData.userId = req.user.userId;
    await exerciseService.createExercise(userData);
    return res.status(200).json({ message: "Exercise created" });
  } catch (error) {
    return res.status(400).json({ error: error.message || error });
  }
};

// Get exercise by its PK
exports.getExerciseById = async (req, res) => {
  const { exerciseId } = req.params;
  if (!exerciseId) {
    return res.status(400).json({ message: "Missing exerciseId argument" });
  }
  try {
    const exercise = await exerciseService.getExerciseById(exerciseId);
    return res.status(200).json({ data: exercise });
  } catch (error) {}
};

// Delete exercise
exports.deleteExercise = async (req, res) => {
  const { exerciseId } = req.params;
  const { userId } = req.user;
  try {
    await exerciseService.deleteExercise(exerciseId, userId);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({ error: error.message || error });
  }
};

// Get predefined body parts from app
exports.getBodyParts = async (req, res) => {
  try {
    return res.status(200).json({ data: BODY_PARTS });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Get predefined gym equipment from app
exports.getEquipment = async (req, res) => {
  try {
    return res.status(200).json({ data: EQUIPMENT });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
