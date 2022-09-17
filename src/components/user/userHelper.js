const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.createRandomString = () => {
  return crypto.randomBytes(12).toString("hex");
};

exports.hashPassword = (userPassword) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(userPassword, salt);
  return hashedPassword;
};

// Check if user provided email is type of email
exports.checkInputEmail = (userEmail) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return userEmail.match(emailRegex);
};

exports.compareUserPasswords = (
  userProvidedPassword,
  userSavedPassword
) => {
  return bcrypt.compareSync(userProvidedPassword, userSavedPassword);
};
