const { emailVerificationTemplate } = require("./htmlTemplates");

const emailVerificationMailOptions = (code, email, name) => {
  return {
    to: email,
    subject: `${code} is your Snappy Confirmation Code`,
    html: emailVerificationTemplate({ code, name }),
  };
};

module.exports = {
  emailVerificationMailOptions,
};
