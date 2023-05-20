module.exports = (msg, code, success) => {
  message = message || 'internal server error';
  err.success = success || true;
  const err = new Error (message);
  err.code = code || 5000;
  return err;
};
