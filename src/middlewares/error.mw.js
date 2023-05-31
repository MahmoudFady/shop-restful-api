module.exports = (err, req, res, next) => {
  const message = err.messages || "Internal Server Error";
  res.status(err.status || 500).json({ message });
};
