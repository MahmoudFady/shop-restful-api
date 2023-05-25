module.exports = (msg, status) => {
  message = message || "internal server error";
  const err = new Error(message);
  err.status = status || 5000;
  return err;
};
