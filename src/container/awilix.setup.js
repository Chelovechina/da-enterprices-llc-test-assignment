const { createContainer, asClass, asValue } = require('awilix');
const pool = require('../config/db');
const jwtConfig = require('../config/jwt');

const container = createContainer();

container.register({
  pool: asValue(pool),
  jwtConfig: asValue(jwtConfig),

  userRepository: asClass(require('../repositories/user.repository')),
  tokenRepository: asClass(require('../repositories/token.repository')),
  fileRepository: asClass(require('../repositories/file.repository')),

  authService: asClass(require('../services/auth.service')),
  tokenService: asClass(require('../services/token.service')),
  fileService: asClass(require('../services/file.service')),

  authController: asClass(require('../controllers/auth.controller')),
  fileController: asClass(require('../controllers/file.controller'))
});

module.exports = container;
