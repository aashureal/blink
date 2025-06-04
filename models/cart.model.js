// models/cart.js

const mongoose = require("mongoose");
const Joi = require("joi");

// ----- Mongoose Schema with Validation -----
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required for cart"],
    },
    products: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      ],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "Cart must have at least one product",
      },
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [0, "Total price cannot be negative"],
    },
  },
  { timestamps: true }
);

// Create the Cart model
const Cart = mongoose.model("Cart", cartSchema);

// ----- Joi Validation Function -----
function validateCart(data) {
  const schema = Joi.object({
    user: Joi.string().hex().length(24).required(),
    products: Joi.array()
      .items(Joi.string().hex().length(24))
      .min(1)
      .required(),
    totalPrice: Joi.number().min(0).required(),
  });

  return schema.validate(data);
}

module.exports = {
  Cart,
  validateCart,
};
