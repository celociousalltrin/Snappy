import toast from "react-hot-toast";

const staticResponseData = [
  {
    code: "SUCC001",
    message: "Image Uploaded Successfully",
  },
  {
    code: "SUCC002",
    message: "The password has been reset",
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
    message: "Enter and Verify OTP to Move Next Step",
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
  {
    code: "FA007",
    message: "Please Select in Editor where you need to add link",
  },
  {
    code: "FA008",
    message: "Enter the all the OTP code ",
  },
  {
    code: "FA009",
    message: "Enter OTP",
  },
  {
    code: "FA010",
    message: "You can Choose only 5 interest",
  },
  {
    code: "FA011",
    message: "To proceed, You must create Description about 15 characters",
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
