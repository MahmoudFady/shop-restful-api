const mongoose = require ('mongoose');

const orderSchema = new mongoose.Schema ({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {type: Number, required: true},
      price: {type: Number, required: true},
    },
  ],
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
  shippingAddress: {
    address: {type: String, required: true},
    city: {type: String, required: true},
    postalCode: {type: String, required: true},
    country: {type: String, required: true},
  },
  paymentMethod: {
    type: String,
    enum: ['PayPal', 'Stripe', 'Cash'],
    required: true,
  },
  paymentResult: {
    id: {type: String},
    status: {type: String},
    update_time: {type: String},
    email_address: {type: String},
  },
  shippingPrice: {type: Number, required: true, default: 0.0},
  totalPrice: {type: Number, required: true, default: 0.0},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date},
});

const Order = mongoose.model ('Order', orderSchema);

module.exports = Order;
