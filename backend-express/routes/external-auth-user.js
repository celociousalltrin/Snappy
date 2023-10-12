var express = require("express");
const {
  loginExtrernalAuthenticatedUser,
  externalAuthenticatedUserProfileCompletion,
} = require("../controllers/externalAuthUserController");
var router = express.Router();

router.get("/external-authenticate-login", loginExtrernalAuthenticatedUser);
router.post(
  "/external-authenticated-user-profile-completion",
  externalAuthenticatedUserProfileCompletion
);

module.exports = router;
