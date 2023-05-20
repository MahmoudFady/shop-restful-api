const mongoose = require ('mongoose');
const paymentSchema = new mongoose.Schema ({
  paymentId: {type: String, required: true},
  amount: {type: Number, required: true},
  paymentMethod: {type: String, required: true},
});

module.exports = mongoose.model ('Payment', paymentSchema);
