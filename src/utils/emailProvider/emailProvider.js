const sendgrid = require("@sendgrid/mail");

const { SG_API_KEY } = require("../serverConfig");
const {
  createRegistrationEmail,
} = require("./emailTemplates/registrationEmail");

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
