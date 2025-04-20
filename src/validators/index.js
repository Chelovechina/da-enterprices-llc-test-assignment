const Joi = require('joi')

module.exports = {
  auth: {
    signUp: Joi.object({
      id: Joi.string().required(),
      password: Joi.string().min(6).required()
    }),
    signIn: Joi.object({
      id: Joi.string().required(),
      password: Joi.string().required()
    }),
    refresh: Joi.object({
      refreshToken: Joi.string().required()
    })
  }
}
