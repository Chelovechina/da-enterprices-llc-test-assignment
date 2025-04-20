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

class NotFoundError extends AppError {
  constructor(message = 'Not found', details = []) {
    super(message, 404, details);
  }
}

module.exports = {
  AppError,
  BadRequestError,
  NotFoundError
};
