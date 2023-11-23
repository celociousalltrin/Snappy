const responseData = [
  { code: "OK001", message: "Snappy User is Created" },
  {
    code: "OK002",
    message: "Logged in successfully",
  },
  {
    code: "OK003",
    message: "Loggout  successfully",
  },
  {
    code: "OK004",
    message: "Snappy Profile Completed",
  },
  {
    code: "OK005",
    message:
      "Verification Code is sent to your email address.Check your emaile Inbox or Spam",
  },
  {
    code: "OK006",
    message: "The OTP is Verified",
  },
  {
    code: "OK007",
    message: "Your Snapp has been Created",
  },
  {
    code: "OK008",
    message: "You have been Connected",
  },
  {
    code: "OK009",
    message: "Your COnnection has been removed",
  },

  { code: "ER999", message: "Something went wrong" },
  { code: "ER001", message: "Requested Page not found" },
  { code: "ER002", message: "UserName already Exists" },
  { code: "ER003", message: "Email Does Not have any account" },
  { code: "ER004", message: "InCorrect Password" },
  {
    code: "ER005",
    message: "There is an issue while sending mail. Please try again.",
  },
  {
    code: "ER006",
    message: "The OTP you have got is Expired.Please, generate a new OTP",
  },
  {
    code: "ER007",
    message:
      "Oops! It looks like you entered the wrong OTP. Please verify your email or request a new",
  },
  {
    code: "ER008",
    message:
      "Oops! You have reached your snap limit.However, you can create a new Snapp by deleting the existing Snapp.",
  },
  { code: "ER901", message: "Please Autheticate" },
];

exports.responseMessage = (code) => {
  const info = responseData.find((o) => o.code === code);
  return info;
};
