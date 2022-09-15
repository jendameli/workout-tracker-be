const { SG_EMAIL_SENDER } = require("../../serverConfig");
console.log(SG_EMAIL_SENDER);

exports.createRegistrationEmail = (firstName, email, registrationHash) => {
  return {
    to: email,
    from: SG_EMAIL_SENDER,
    subject: "Workout App - Registration email",
    html: `
        <div>
            <h3>Hi, ${firstName}</h3>
            <p>Welcome to our app</p>
            <p>Pls confirm your account by clicking link down below</p>
            <a href="http://localhost:3000/user/confirm-account/${registrationHash}">Confirm account</a>
        </div>
        `,
  };
};
