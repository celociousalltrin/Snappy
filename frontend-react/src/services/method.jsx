import axios from "./axios-utils";

//INVESTOR APIS

export const createInvestor = (props) => axios.post("/auth/create-user", props);

// VALIDATION APIS

export const validateUserName = (props) =>
  axios.post("/validation/user-name", props);
