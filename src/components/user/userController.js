const userService = require("./userService");
const { checkInputEmail } = require("./userHelper");
const { createJwtToken } = require("../../utils/jwtUtility");
const { JWT_EXPIRATION } = require("../../utils/serverConfig");

exports.getAllUsers = async (req, res) => {
  try {
    const registeredActivatedUsers = await userService.getAllUsers();
    return await res.status(200).json({ data: registeredActivatedUsers });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Endpoint to get user by provided userId(Pk) via params
exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "Missing userId parameter" });
  }
  try {
    const userAccount = await userService.getUserById(parseInt(userId));
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
    !checkInputEmail(userRegistrationData.email)
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

// Endpoint to confirm user account via email with unique hash.
exports.confirmUserAccount = async (req, res) => {
  const { registrationHash } = req.params;
  try {
    await userService.confirmUserAccount(registrationHash);
    return res.status(200).json({ message: "Account activated" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Endpoint for logging user and create auth token
exports.loginUser = async (req, res) => {
  const userCredentials = req.body;
  try {
    const userAccount = await userService.loginUser(userCredentials);
    const jwtToken = createJwtToken(userAccount);
    res.cookie("jwt", jwtToken, {
      maxAge: JWT_EXPIRATION,
      httpOnly: true,
    });
    return res.status(200).json({ message: "User logged successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// get account from logged user - if not logged redirection to login page follows up
exports.getUserAccount = async (req, res, next) => {
  try {
    return res.status(200).json({ message: "User account" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.logoutUser = (req, res) => {
  try {
    return res
      .clearCookie("jwt")
      .status(200)
      .json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.resetUserPassword = async (req, res) => {
  const { email } = req.body;
  try {
    await userService.resetUserPassword(email);
    return res.status(200).json({
      message: "If this is correct email we will send you reset password",
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.makeUserInactive = async (req, res) => {
  const { userId } = req.params;
  try {
    await userService.makeUserInactive(parseInt(userId));
    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await userService.deleteUser(parseInt(userId));
    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.editUserDetails = async (req, res) => {
  const userData = req.body;
  const { userId } = req.user;
  try {
    await userService.editUserDetails(userData, userId);
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
