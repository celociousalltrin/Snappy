const passport = require("passport");
const { isValid } = require("../services/validationService");
const userModel = require("../models/userModel");
const {
  createExtrernalAuthenticatedUserService,
} = require("../services/authUserService");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const passportGoogleStartegy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_AUTHENTICATION_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTHENTICATION_CLIENT_SECRET,
    callbackURL: `${process.env.EXPRESS_APP_URL}/auth/google/callback`,
  },
  async (accessToken, refreshToken, userInfo, cb) => {
    const { picture, email, email_verified } = userInfo._json;
    const isEmailExist = await isValid(userModel, "email", email);
    if (isEmailExist) {
      return cb(null, { email_verified, email, is_existing_user: true });
    } else {
      await createExtrernalAuthenticatedUserService(userModel, {
        email,
        user_data_url: picture,
      });
      return cb(null, { email_verified, email, is_existing_user: false });
    }

    //? This return move towards the failure redirect
    // return cb(null, false);
  }
);

module.exports = { passportGoogleStartegy };
