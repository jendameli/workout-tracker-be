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
