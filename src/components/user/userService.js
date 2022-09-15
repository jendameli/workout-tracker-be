const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {
  sendRegistrationEmail,
} = require("../../utils/emailProvider/emailProvider");

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

// Check if user provided email is type of email
exports.checkInputEmail = (userEmail) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return userEmail.match(emailRegex);
};

// Main services for user resource

exports.getAllUsers = async () => {
  try {
    return await User.findAll(
      {
        attributes: [
          "userId",
          "firstName",
          "lastName",
          "age",
          "email",
          "createdAt",
        ],
        where: { isActivated: true },
      }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getUserById = async (userId) => {
  try {
    return await User.findByPk(userId, {
      attributes: ["userId", "firstName", "lastName", "email", "createdAt"],
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.registerUser = async (userData) => {
  const hashedPassword = hashPassword(userData.password);
  const registrationLink = createRandomString();

  const userRegistration = Object.assign(userData, {
    password: hashedPassword,
    registrationHash: registrationLink,
  });
  try {
    await User.create(userRegistration);
    await sendRegistrationEmail(
      userRegistration.firstName,
      userRegistration.email,
      registrationLink
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.confirmUserAccount = async (registrationHash) => {
  const userAccount = await User.findOne({ where: { registrationHash } });
  if (!userAccount) {
    throw new Error("No users found!");
  }
  try {
    userAccount.isActivated = true;
    userAccount.registrationHash = null;
    await userAccount.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

// TODO: Logic
exports.loginUser = async () => {
  return;
};
