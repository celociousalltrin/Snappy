import toast from "react-hot-toast";

const staticResponseData = [
  {
    code: "SUCC001",
    message: "Sample for the static error response message",
  },
  {
    code: "FA001",
    message: "UserName Already Exists",
  },
  {
    code: "FA002",
    message: "To proceed, please complete the required fields in the form",
  },
  {
    code: "FA003",
    message: "Enter OTP to Move Next Step",
  },
  {
    code: "FA004",
    message: "To proceed, please Select the Profile image",
  },
  {
    code: "FA005",
    message: "To proceed, please Select the Interest",
  },
  {
    code: "FA006",
    message: "Please Select Follow 2 Snappers to Register in Snappy",
  },
];

const staticResponseType = (code) => {
  let type;
  if (code.startsWith("S")) {
    type = "success";
  } else {
    type = "error";
  }
  return type;
};
export const staticResponseMessage = (code, duration = 2500) => {
  const info = staticResponseData.find((o) => o.code === code);
  return toast[staticResponseType(info.code)](info.message, { duration });
};
