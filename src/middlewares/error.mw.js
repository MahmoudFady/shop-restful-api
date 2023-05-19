module.exports = (err, req, res, next) => {
  const message = err.message || "something  go wrong ";
  res.status(err.code || 500).json({ message });
};
