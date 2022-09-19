const { SG_EMAIL_SENDER } = require("../../serverConfig");

exports.createResetPasswordEmail = (firstName, email, newPassword) => {
  return {
    to: email,
    from: SG_EMAIL_SENDER,
    subject: "Workout App - your reset password request",
    html: `
        <div>
            <h3>Hi, ${firstName}</h3>
            <p>New password request</p>
            <p>Your new password is: ${newPassword}</p>
            <p>We strongly encourage you to change this password with first login</p>
        </div>
        `,
  };
};
