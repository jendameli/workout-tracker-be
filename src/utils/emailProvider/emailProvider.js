const sendgrid = require("@sendgrid/mail");

const { SG_API_KEY } = require("../serverConfig");
const {
  createRegistrationEmail,
} = require("./emailTemplates/registrationEmail");
const {
  createResetPasswordEmail,
} = require("./emailTemplates/resetPasswordEmail");

sendgrid.setApiKey(SG_API_KEY);

exports.sendRegistrationEmail = async (firstName, email, registrationHash) => {
  const registrationEmail = createRegistrationEmail(
    firstName,
    email,
    registrationHash
  );
  try {
    await sendgrid.send(registrationEmail);
  } catch (error) {
    throw error;
  }
};

exports.sendResetPasswordEmail = async (firstName, email, newPassword) => {
  const resetPasswordEmail = createResetPasswordEmail(
    firstName,
    email,
    newPassword
  );
  try {
    await sendgrid.send(resetPasswordEmail);
  } catch (error) {
    throw error;
  }
};
