const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  subCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      require: true,
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
