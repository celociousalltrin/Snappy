const responseData = [
  { code: "OK001", message: "Snappy User is Created" },
  { code: "ER999", message: "Something went wrong" },
  { code: "ER001", message: "Requested Page not found" },
];

exports.responseMessage = (code) => {
  const info = responseData.find((o) => o.code === code);
  return info;
};
