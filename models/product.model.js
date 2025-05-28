// models/product.js

const mongoose = require("mongoose");
const Joi = require("joi");

// ----- Mongoose Schema with Validation -----
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [1, "Product name must be at least 1 character"],
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      maxlength: [50, "Category cannot exceed 50 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    stocks: {
      type: Boolean,
      required: [true, "Stocks status is required"],
      default: true,
    },
    images: {
      type: String,
      required: [true, "At least one image URL is required"],
    },
  },
  { timestamps: true }
);

// Create the Product model
const Product = mongoose.model("Product", productSchema);

// ----- Joi Validation Function -----
function validateProduct(data) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().max(50).required(),
    description: Joi.string().max(500).allow("", null),
    stocks: Joi.boolean().required(),
    images: Joi.string().required(),
  });

  return schema.validate(data);
}

module.exports = {
  Product,
  validateProduct,
};
