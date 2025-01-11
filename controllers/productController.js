const productModel = require("../models/productSchema.js");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors.js");
const path = require("path");
const ErrorHandler = require("../utils/ErrorHandler.js");
const imagekit = require("../utils/ImageKit.js").initImageKit();

exports.test = catchAsyncErrors(async (req, res) => {
  res.status(201).json({ success: true, message: "Product Test API" });
});

exports.addProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, price, description, category } = req.body;
  const file = req.file;

  if (!name || !price || !description || !category) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all fields" });
  }
  if (!file) return next(new ErrorHandler("Select Product Image", 404, true));

  const filerename = `product${Date.now()}${path.extname(file.originalname)}`;
  const { fileId, url } = await imagekit.upload({
    file: file.buffer,
    fileName: filerename,
    folder: "Products",
  });
  const data = { ...req.body, image: { url, fileId }, createdBy: req.user };
  const product = await productModel(data).save();
  res
    .status(201)
    .json({ success: true, product, message: "Product created successfully" });
});

exports.readProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await productModel.find().exec();
  res.status(200).json({ success: true, products });
});

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const file = req.file;
  console.log(file);
  if (!file) return next(new ErrorHandler("Select Product Image", 404, false));
  let product = await productModel.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  if (product.image.url) {
    await imagekit.deleteFile(product.image.fileId);
  }

  const filerename = `product${Date.now()}${path.extname(file.originalname)}`;
  const { fileId, url } = await imagekit.upload({
    file: file.buffer,
    fileName: filerename,
    folder: "Products",
  });
  const data = { ...req.body, image: { url, fileId }, createdBy: req.user };

  product = await productModel.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, product });
});

exports.singleProduct = catchAsyncErrors(async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  res.status(200).json({ success: true, product });
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await productModel.findByIdAndDelete(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  if (product.image) {
    await imagekit.deleteFile(product.image.fileId);
  }
  res.status(200).json({ success: true, message: "Product deleted" });
});
