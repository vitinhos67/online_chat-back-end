module.exports = (err, req, res, next) => {
  if (err) {
    return res.status(200).json({
      err: err.message,
      statusCode: 401,
    });
  }

  next();
};
