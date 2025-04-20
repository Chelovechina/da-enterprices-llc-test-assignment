require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  tokenExpiration: process.env.JWT_TOKEN_EXPIRATION,
  refreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION
};
