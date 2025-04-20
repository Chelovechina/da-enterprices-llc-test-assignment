module.exports = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      details: err.details
    });
  }

  console.error(err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
} 
