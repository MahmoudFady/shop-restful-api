const mongoose = require("mongoose");
const RESET_TOKEN_PERIOD = 2 * 60 * 60 * 1000;
const Schema = mongoose.Schema;
const restPasswordSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  email: String,
  resetToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: RESET_TOKEN_PERIOD,
  },
});

module.exports = mongoose.model("ResetPassword", restPasswordSchema);
