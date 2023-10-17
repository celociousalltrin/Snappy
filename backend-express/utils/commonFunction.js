const jwt = require("jsonwebtoken");

const generateAccessToken = (data, expiresIn = "15m") => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
};

const generateRefreshToken = (data, expiresIn) => {
  return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn });
};

const assignRefreshTokeninCookie = (res, data, expiresIn = "12h") => {
  res.cookie("refresh_token", generateRefreshToken(data, expiresIn), {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const tokenVerification = (err, decoded, token, req) => {
  switch (err?.name) {
    case "JsonWebTokenError":
      return err?.name;
    case "TokenExpiredError":
      if (token === "accessToken") {
        req.new_access_token = generateAccessToken({
          user_email: decoded?.user_email,
        });
      } else {
        return { refresh_token_expired: true };
      }
      return { is_expired: true };
    default:
      return decoded;
  }
};

const otpLength = (len) => {
  return parseInt("1" + "0".repeat(len));
};

const OtpGenerator = (length = 4) => {
  return Math.floor(Math.random() * otpLength(length))
    .toString()
    .padStart(4, "0");
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  assignRefreshTokeninCookie,
  tokenVerification,
  OtpGenerator,
};
