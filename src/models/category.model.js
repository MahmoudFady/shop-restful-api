const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  subCategories: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
