const emailVerificationTemplate = ({ code, name }) => {
  return `<div>
    <h2 style="color: blue;">Email Verification for Snappy Registration</h2>
    <p>Hey <b>${name}</b>,</p>
    <p>You recently registered for Snappy. To complete your Snappy registration, please confirm your account.</p>
    <p>You asked to enter this confirmation code:</p>
    <h1>${code}</h1>
    <p style="opacity: 0.7;">Snappy helps you communicate with all the other snappers around the world. Once you've joined Snappy, you'll be able to share Snapps, Chats and more.</p>
    </div>`;
};

module.exports = { emailVerificationTemplate };
