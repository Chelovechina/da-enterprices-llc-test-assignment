const jwt = require('jsonwebtoken');
const container = require('../container/awilix.setup');
const { BadRequestError } = require('../errors');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const jwtConfig = container.resolve('jwtConfig');
  const tokenRepository = container.resolve('tokenRepository');

  if (!authHeader) {
    throw new BadRequestError('Token not provided')
  }

  const [scheme, token] = authHeader.split(' ');

  if (!/^Bearer$/i.test(scheme)) {
    throw new BadRequestError('Token malformatted')
  }

  try {
    const isActive = await tokenRepository.isValid(token);
    if (!isActive) {
      throw new BadRequestError('Token revoked')
    }

    const decoded = jwt.verify(token, jwtConfig.secret);

    req.userId = decoded.id;
    req.token = token;

    return next();
  } catch (err) {
    throw new BadRequestError('Token invalid')
  }
};
