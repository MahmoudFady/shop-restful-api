const mongoose = require("mongoose");
const subCategorySchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
