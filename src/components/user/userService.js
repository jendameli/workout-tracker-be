const bcrypt = require("bcrypt");
const crypto = require("crypto");

const User = require("./userModel");

// Helper functions
const createRandomString = () => {
  return crypto.randomBytes(12).toString("hex");
};

const hashPassword = (userPassword) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(userPassword, salt);
  return hashedPassword;
};

const comparePasswords = (enteredPassword) => {
  // TODO: Logic for compare passwords, boolean
};

// Check if user provided email is email
exports.checkInputEmail = (userEmail) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return userEmail.match(emailRegex);
};

// Main services for user resource
// TODO: Logic
exports.getAllUsers = async () => {
  return;
};
// TODO: Logic
exports.getUserById = async () => {
  return;
};

exports.registerUser = async (userData) => {
  const hashedPassword = hashPassword(userData.password);
  const registrationLink = createRandomString();
  const userRegistration = Object.assign(userData, {
    password: hashedPassword,
    registrationHash: registrationLink,
  });
  try {
    return await User.create(userRegistration);
  } catch (error) {
    throw new Error(error.message);
  }
};
// TODO: Logic
exports.loginUser = async () => {
  return;
};
