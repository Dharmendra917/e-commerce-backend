const express = require("express");
const {
  test,
  addProduct,
  readProducts,
  updateProduct,
  singleProduct,
  deleteProduct,
} = require("../controllers/productController");
const { userIsAuth } = require("../middlewares/auth");
const { upload } = require("../middlewares/multer");
const roleMiddleware = require("../middlewares/roleMiddleware");
const router = express.Router();

router.get("/test", test);

router.post(
  "/add-product",
  userIsAuth,
  roleMiddleware(["admin"]),
  upload.single("image"),
  addProduct
);

router.get("/read", readProducts);

router.post(
  "/update/:id",
  userIsAuth,
  roleMiddleware(["admin"]),
  upload.single("image"),
  updateProduct
);

router.get("/single/:id", singleProduct);

router.get("/delete/:id", userIsAuth, roleMiddleware(["admin"]), deleteProduct);

module.exports = router;
