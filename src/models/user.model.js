const mongoose = require("mongoose");
const passwordUtil = require("../utils/password.util");
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
      type: String,
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
      immutable: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["femal", "male"],
    },
    image: {
      type: String,
      required: true,
      default: "http://localhost:8080/uploads/user-avatar.png",
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
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password"))
    this.password = await passwordUtil.hash(this.password);

  next();
});
module.exports = mongoose.model("User", userSchema);
