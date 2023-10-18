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

// FEED APIS
export const getFeed = () => axios.get("/feed");

// LOGOUT APIS
export const logout = () => axios.get("/logout");

// VALIDATION APIS
export const validateUserName = (props) =>
  axios.post("/validation/user-name", props);
