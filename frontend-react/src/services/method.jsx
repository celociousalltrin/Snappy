import axios from "./axios-utils";

//Auth APIS
export const createUser = (props) => axios.post("/auth/create-user", props);

export const login = (props) => axios.post("/auth/login", props);

export const generateEmailVerificationOTP = (props) =>
  axios.post("/auth/generate-email-verification-otp", props);

export const verifyEmailVerificationOTP = (props) =>
  axios.post("/auth/verify-email-verification-OTP", props);

export const createGoogleuser = () => axios.get("/auth/create-google-user");

export const loginExternalAuthenticateUser = () =>
  axios.get("/external-auth/external-authenticate-login");

export const externalAuthenticatedUserProfileCompletion = (props) =>
  axios.post(
    "external-auth/external-authenticated-user-profile-completion",
    props
  );

// TEST APIS
export const testRoute = () => axios.get("/auth/test-route");

// SNAPP APIS
export const getSnapp = () => axios.get("/snapp");
export const createSnapp = (props) => axios.post("/snapp", props);

// CONNECTORS APIS
export const getSignupConnectorsList = () =>
  axios.get("/auth/signup-connector");

export const signupCreateConnector = (props) =>
  axios.post("/auth/signup-connector", props);

export const signupDeleteConnector = ({ alliance_id, fan_id }) =>
  axios.delete(`/auth/signup-connector/${alliance_id}/${fan_id}`);

// LOGOUT APIS
export const logout = () => axios.get("/logout");

// VALIDATION APIS
export const validateUserName = (props) =>
  axios.post("/validation/user-name", props);
