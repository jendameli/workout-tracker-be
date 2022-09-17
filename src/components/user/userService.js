const {
  hashPassword,
  createRandomString,
  compareUserPasswords,
} = require("./userHelper");
const {
  sendRegistrationEmail,
} = require("../../utils/emailProvider/emailProvider");
const User = require("./userModel");

// Get all activated users
exports.getAllUsers = async () => {
  try {
    return await User.findAll({
      attributes: [
        "userId",
        "firstName",
        "lastName",
        "age",
        "email",
        "createdAt",
      ],
      where: { isActivated: true },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get specific user by userId
exports.getUserById = async (userId) => {
  try {
    return await User.findByPk(userId, {
      attributes: ["userId", "firstName", "lastName", "email", "createdAt"],
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create new user registration and send registration email
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

// Service to change user account based upon click on activation link
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

exports.loginUser = async ({ email, password }) => {
  const userAccount = await User.findOne({
    where: { email },
  });
  if (!userAccount) {
    throw new Error("User doesnt exists");
  }
  const isPasswordValid = compareUserPasswords(password, userAccount.password);
  if (isPasswordValid) {
    return {
      userId: userAccount.userId,
      firstName: userAccount.firstName,
      lastName: userAccount.lastName,
    };
  }

  return null;
};
