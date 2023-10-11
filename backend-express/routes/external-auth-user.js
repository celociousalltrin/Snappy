var express = require("express");
const {
  loginExtrernalAuthenticatedUser,
} = require("../controllers/externalAuthUserController");
var router = express.Router();

router.get("/external-authenticate-login", loginExtrernalAuthenticatedUser);

module.exports = router;
