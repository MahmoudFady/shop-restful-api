module.exports = (msg, status) => {
  msg = msg || "internal server error";
  const err = new Error(msg);
  err.status = status || 500;
  return err;
};
