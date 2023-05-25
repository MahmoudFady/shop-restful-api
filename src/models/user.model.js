const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema(
  {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);
const addressSchema = new mongoose.Schema(
  {
    governorate: {
      type: String,
      required: true,
    },
    city: { type: String, required: true },
    street: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);
const userSchema = new mongoose.Schema(
  {
    name: nameSchema,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    image: {
      type: String,
      required: true,
      default: "https://examples.com/images/mahmoud.jpg",
    },
    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
    },
    address: addressSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
