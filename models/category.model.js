// models/category.js

const mongoose = require("mongoose");
const Joi = require("joi");

// ----- Mongoose Schema with Validation -----
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      minlength: [1, "Category name must be at least 1 character"],
      maxlength: [100, "Category name cannot exceed 100 characters"],
    },
  },
  { timestamps: true }
);

// Create the Category model
const Category = mongoose.model("Category", categorySchema);

// ----- Joi Validation Function -----
function validateCategory(data) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
  });

  return schema.validate(data);
}

module.exports = {
  Category,
  validateCategory,
};
