// Built in pakages
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();
// Start app routes
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const ReviewRoutes = require("./routes/review.routes");
const couponRoutes = require("./routes/coupon.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const orderItemsRoutes = require("./routes/orderItem.routes");
const shippingRoutes = require("./routes/shipping.routes");
const favsRoutes = require("./routes/favourite.routes");

const notFounMw = require("./middlewares/not-found.mw");
const errMw = require("./middlewares/error.mw");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "../", "uploads")));
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(orderItemsRoutes);
app.use(shippingRoutes);
app.use(ReviewRoutes);
app.use(couponRoutes);
app.use(favsRoutes);
app.use(notFounMw);
app.use(errMw);
module.exports = app;
