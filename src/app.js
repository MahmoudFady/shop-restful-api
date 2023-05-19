// Built in pakages
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
// Start app routes
const userRoutes = require("./interfaces/routes/user.routes");
const productRoutes = require("./interfaces/routes/product.routes");
// Start app middlewares
const notFoundMW = require("./interfaces/middlewares/not-found.mw");
const errorMW = require("./interfaces/middlewares/error.mw");
const categoryRoutes = require("./interfaces/routes/category.routes");
const subCategoryRoutes = require("./interfaces/routes/subcategory.routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(userRoutes);
app.use(categoryRoutes);
app.use(subCategoryRoutes);
app.use(productRoutes);
app.use(notFoundMW);
app.use(errorMW);
module.exports = app;
