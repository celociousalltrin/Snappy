var express = require("express");
var router = express.Router();
const passport = require("passport");

const { passportGoogleStartegy } = require("../utils/strategies");

const {
  create_user,
  login,
  http_status_test_router,
  generateEmailVerificationOTP,
  verifyEmailVerificationOTP,
} = require("../controllers/authUserController");
const { assignRefreshTokeninCookie } = require("../utils/commonFunction");

router.post("/create-user", create_user);

//SSO with Passportjs implemented

router.use(passport.initialize());

passport.use("google_auth", passportGoogleStartegy);

router.get(
  "/create-google-user",
  passport.authenticate("google_auth", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google_auth", {
    session: false,
    failureRedirect: `${process.env.REACT_APP_URL}/signup?data=is_error`,
  }),
  (req, res) => {
    const { email_verified, email, is_existing_user } = req.user;
    if (email_verified) {
      assignRefreshTokeninCookie(res, { user_email: email }, "20m");
      if (is_existing_user) {
        res.redirect(`${process.env.REACT_APP_URL}/external-authenticate`);
      } else {
        res.redirect(`${process.env.REACT_APP_URL}/profile-completion`);
      }
    }
  }
);
// END

router.post("/login", login);

router.post("/generate-email-verification-otp", generateEmailVerificationOTP);
router.post("/verify-email-verification-OTP", verifyEmailVerificationOTP);

module.exports = router;
