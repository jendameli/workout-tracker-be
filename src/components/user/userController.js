// TODO: Logic
exports.getAllUsers = async (req, res) => {
  try {
    return await res.status(200).json({ message: "Get all users" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
// TODO: Logic
exports.getUserById = async (req, res) => {
  try {
    return await res.status(200).json({ message: "Get user by Id" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
// TODO: Logic
exports.registerUser = async (req, res) => {
  try {
    return await res.status(200).json({ message: "Create user" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
// TODO: Logic
exports.loginUser = async (req, res) => {
  try {
    return await res.status(200).json({ message: "Login user" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
