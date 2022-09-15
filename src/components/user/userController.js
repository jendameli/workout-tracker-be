const userService = require("./userService");

exports.getAllUsers = async (req, res) => {
  try {
    const registeredActivatedUsers = await userService.getAllUsers();
    return await res.status(200).json({ data: registeredActivatedUsers });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "Missing userId parameter" });
  }
  try {
    const userAccount = await userService.getUserById(userId);
    return await res.status(200).json({ data: userAccount });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Endpoint to create a new user registration
exports.registerUser = async (req, res) => {
  const userRegistrationData = req.body;
  if (
    !userRegistrationData.email ||
    !userService.checkInputEmail(userRegistrationData.email)
  ) {
    return res
      .status(400)
      .json({ error: "Email is required to finish your registration" });
  }
  try {
    await userService.registerUser(userRegistrationData);
    return res
      .status(200)
      .json({ message: "User registration created successfully" });
  } catch (error) {
    if (error.message === "Validation error") {
      // TODO: redirect in FE to login page
      return res
        .status(200)
        .json({ error: "This email is already registered" });
    }
    return res.status(400).json({ error: error.message });
  }
};

exports.confirmUserAccount = async (req, res) => {
  const { registrationHash } = req.params;
  try {
    await userService.confirmUserAccount(registrationHash);
    return res.status(200).json({ message: "Account activated" });
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
