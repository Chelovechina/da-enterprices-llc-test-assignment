const { BadRequestError } = require('../errors');

module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(
      req.method === 'GET' ? req.query : req.body,
      { abortEarly: false }
    );

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/"/g, '')
      }));
      throw new BadRequestError('Validation failed', errors);
    }

    next();
  };
};
