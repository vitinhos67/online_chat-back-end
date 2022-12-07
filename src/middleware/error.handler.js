module.exports = (err, req, res, next) => {
  if (err) {
    console.log(err);

    return res.status(400).json({
      err: err.message,
    });
  }

  next();
};
