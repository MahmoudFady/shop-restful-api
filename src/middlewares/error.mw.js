module.exports = (err, req, res, next) => {
  const message = err.message || 'something went wrong ';
  res.status (err.code || 500).json ({message});
};
