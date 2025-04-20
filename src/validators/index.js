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
  },
  file: {
    list: Joi.object({
      page: Joi.number().integer().min(1).default(1),
      list_size: Joi.number().integer().min(1).max(100).default(10)
    }),
  },
}
