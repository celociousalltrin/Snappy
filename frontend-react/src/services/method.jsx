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

export const getSignupConnectorsList = () =>
  axios.get("/auth/signup-connector");

// TEST APIS
export const testRoute = () => axios.get("/auth/test-route");

// SNAPP APIS
export const getSnapps = (type) => axios.get(`/snapp/${type}`);
export const createSnapp = (props) => axios.post("/snapp", props);

// LIKE APIS
export const createLike = (props) => axios.post("/like", props);
export const deleteLike = (id) => axios.delete(`/like/${id}`);

// BOOKMARK APIS
export const createBookmark = (props) => axios.post("/bookmark", props);
export const deleteBookmark = (id) => axios.delete(`/bookmark/${id}`);

// COMMENT APIS
export const createComment = (props) => axios.post("/comment", props);
export const replyComment = (props) => axios.put("/comment", props);

// CONNECTORS APIS

export const createConnector = (props) => axios.post("/connector", props);

export const getAllianceConnectorList = () =>
  axios.get("/connector/alliance-list");

export const getFanConnectorList = () => axios.get("/connector/fan-list");

export const getConnectorList = () => axios.get("/connector/list");

export const removeConnector = (alliance_id) =>
  axios.delete(`/connector/${alliance_id}`);

// LOGOUT APIS
export const logout = () => axios.get("/logout");

// VALIDATION APIS
export const validateUserName = (props) =>
  axios.post("/validation/user-name", props);
