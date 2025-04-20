class AppError extends Error {
  constructor(message, statusCode, details = []) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends AppError {
  constructor(message = 'Bad Request', details = []) {
    super(message, 400, details);
  }
}

module.exports = {
  AppError,
  BadRequestError
};
