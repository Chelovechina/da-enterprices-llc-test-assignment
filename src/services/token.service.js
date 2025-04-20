const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')

class TokenService {
  constructor({ tokenRepository, jwtConfig }) {
    this.tokenRepository = tokenRepository
    this.jwtConfig = jwtConfig
  }

  async generateTokens(userId, deviceId) {
    const token = jwt.sign(
      { id: userId, deviceId },
      this.jwtConfig.secret,
      { expiresIn: this.jwtConfig.tokenExpiration }
    )

    const refreshToken = jwt.sign(
      { id: userId, deviceId },
      this.jwtConfig.refreshSecret,
      { expiresIn: this.jwtConfig.refreshTokenExpiration }
    )

    await this.tokenRepository.save(token, refreshToken, userId, deviceId);

    return { token, refreshToken };
  }

  async refreshTokens(refreshToken) {
    const decoded = jwt.verify(refreshToken, this.jwtConfig.refreshSecret)

    const isValid = await this.tokenRepository.isValid(refreshToken)
    if (!isValid) {
      throw new BadRequestError('Refresh token revoked')
    }

    await this.tokenRepository.invalidate(refreshToken)

    return this.generateTokens(decoded.id, decoded.deviceId)
  }

  async invalidate(token) {
    await this.tokenRepository.invalidate(token);
  }
}

module.exports = TokenService;
