const {
  hashPassword,
  createRandomString,
  compareUserPasswords,
} = require("./userHelper");
const {
  sendRegistrationEmail,
  sendResetPasswordEmail,
} = require("../../utils/emailProvider/emailProvider");
const User = require("./userModel");

// Get all active and activated users
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
      where: { isActivated: true, isActive: true },
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

  const isPasswordValid = compareUserPasswords(password, userAccount.password);
  if (isPasswordValid) {
    return {
      userId: userAccount.userId,
      firstName: userAccount.firstName,
      lastName: userAccount.lastName,
    };
  }
  if (!userAccount || !isPasswordValid) {
    throw new Error("Wrong email or password");
  }
};

exports.resetUserPassword = async (email) => {
  const userAccount = await User.findOne({ where: { email } });
  if (!userAccount) {
    return;
  }
  try {
    const newPassword = createRandomString();
    const hashedPassword = hashPassword(newPassword);
    userAccount.password = hashedPassword;
    userAccount.save();
    sendResetPasswordEmail(
      userAccount.firstName,
      userAccount.email,
      newPassword
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.makeUserInactive = async (userId) => {
  const userAccount = await User.findByPk(userId);
  if (!userAccount) {
    throw new Error("No user found");
  }
  try {
    userAccount.isActive = false;
    userAccount.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteUser = async (userId) => {
  await User.destroy({ where: { userId } });
};

exports.editUserDetails = async (userData, userId) => {
  try {
    await User.update(userData, { where: { userId } });
  } catch (error) {
    throw error;
  }
};
