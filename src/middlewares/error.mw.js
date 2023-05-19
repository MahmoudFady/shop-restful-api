module.exports = (err, req, res, next) => {
  const message = err.message || "something  go wrong ";
  res.status(err.status || 500).json({ message });
};
