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
  { code: "ER999", message: "Something went wrong" },
  { code: "ER001", message: "Requested Page not found" },
  { code: "ER002", message: "UserName already Exists" },
  { code: "ER003", message: "Email Does Not have any account" },
  { code: "ER004", message: "Incorrect Password" },
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
