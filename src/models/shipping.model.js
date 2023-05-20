const mongoose = require ('mongoose');
const shippingSchema = new mongoose.Schema ({
  shippingId: {type: String, required: true},
  address: {type: String, required: true},
  trackingNumber: {type: String},
});
module.exports = mongoose.model ('Shipping', shippingSchema);
