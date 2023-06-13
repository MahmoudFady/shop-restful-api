module.exports = (err, req, res, next) => {
  console.log(err);
  const message = err.message || "Internal Server Error";
  res.status(err.status || 500).json({ message });
};
