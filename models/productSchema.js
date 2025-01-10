const mongoose = require("mongoose");

const productCategories = ["electronics", "clothing", "books", "home", "toys"];

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, enum: productCategories },
    image: { url: { type: String }, fileId: { type: String } },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
