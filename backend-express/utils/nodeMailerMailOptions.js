const { createUserEmailVerificationTemplate } = require("./htmlTemplates");

const createUserEmailVerificationMailOptions = (code, email, name) => {
  return {
    to: email,
    subject: `${code} is your Snappy Confirmation Code`,
    html: createUserEmailVerificationTemplate({ code, name }),
  };
};

module.exports = {
  createUserEmailVerificationMailOptions,
};
