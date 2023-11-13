import toast from "react-hot-toast";

const responseData = [
  { code: "OK001", message: "Snappy User is Created" },
  {
    code: "OK002",
    message: "Logged in successfully",
  },
  {
    code: "OK003",
    message: "Loggout successfully",
  },
  {
    code: "OK004",
    message: "Snappy Profile Completed",
  },
  {
    code: "OK005",
    message:
      "Verification Code is sent to your email address.Check your mail Inbox or Spam",
  },
  {
    code: "OK006",
    message: "The OTP is Verified",
  },
  { code: "ER999", message: "Something went wrong" },
  { code: "ER001", message: "Requested Page not found" },
  { code: "ER002", message: "UserName already Exists" },
  { code: "ER003", message: "Email Does Not have any account" },
  { code: "ER004", message: "Incorrect Password" },
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

  { code: "ER901", message: "Please Autheticate" },
];

const responseType = (code) => {
  let type;
  if (code.startsWith("O")) {
    type = "success";
  } else {
    type = "error";
  }
  return type;
};
export const responseMessage = (code, duration = 2000) => {
  const info = responseData.find((o) => o.code === code);
  return toast[responseType(info.code)](info.message, { duration });
};
