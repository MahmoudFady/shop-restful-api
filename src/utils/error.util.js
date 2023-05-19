module.exports = (msg, code) => {
  message = message || "internal server error";
  const err = new Error(message);
  err.code = code || 5000;
  return err;
};
