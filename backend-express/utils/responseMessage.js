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
    message: "Verification Code is sent to your email address",
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
  { code: "ER901", message: "Please Autheticate" },
];

exports.responseMessage = (code) => {
  const info = responseData.find((o) => o.code === code);
  return info;
};
