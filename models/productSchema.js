const mongoose = require("mongoose");

const productCategories = [
  "Fashion & Apparel",
  "Men's Wear",
  "Women's Wear",
  "Kids' Wear",
  "Footwear",
  "Electronics & Gadgets",
  "Mobile Devices",
  "Consumer Electronics",
  "Gaming",
  "Home & Kitchen",
  "Home Essentials",
  "Kitchen Appliances",
  "Storage Solutions",
  "Health & Wellness",
  "Fitness Equipment",
  "Personal Care",
  "Nutrition",
  "Beauty & Personal Care",
  "Books & Stationery",
  "Books",
  "Stationery",
  "Groceries & Food",
  "Baby & Kids Products",
  "Sports & Outdoors",
  "Automotive & Accessories",
  "Pet Supplies",
  "Jewelry & Accessories",
  "Handicrafts & Local Products",
  "Technology & Office Supplies",
  "Seasonal Categories",
];

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
