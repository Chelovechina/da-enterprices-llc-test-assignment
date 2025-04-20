const express = require('express');
const validators = require('../validators')
const validationMiddleware = require('../middlewares/validation.middleware')
const authMiddleware = require('../middlewares/auth.middleware')

const router = express.Router();

module.exports = (authController) => {
  router.post(
    '/signup',
    validationMiddleware(validators.auth.signUp),
    (req, res) => authController.signUp(req, res)
  );

  router.post(
    '/signin',
    validationMiddleware(validators.auth.signIn),
    (req, res) => authController.signIn(req, res)
  );

  router.post(
    '/signin/new_token',
    validationMiddleware(validators.auth.refresh),
    (req, res) => authController.refresh(req, res)
  );

  router.get(
    '/info',
    authMiddleware,
    (req, res) => authController.info(req, res)
  );

  router.get(
    '/logout',
    authMiddleware,
    (req, res) => authController.logout(req, res)
  );

  return router
}
