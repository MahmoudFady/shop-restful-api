// Built in pakages
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
// Start app routes
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const subCategoryRoutes = require("./routes/subcategory.routes");
const notFounMw = require("./middlewares/not-found.mw");
const errMw = require("./middlewares/error.mw");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(userRoutes);
app.use(categoryRoutes);
app.use(subCategoryRoutes);
app.use(productRoutes);
app.use(notFounMw);
app.use(errMw);
module.exports = app;
