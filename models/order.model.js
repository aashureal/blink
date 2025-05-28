// models/order.js

const mongoose = require("mongoose");
const Joi = require("joi");

// ----- Mongoose Schema with Validation -----
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required for order"],
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
        message: "Order must contain at least one product",
      },
    },
    address: {
      type: String,
      required: [true, "Shipping address is required"],
      trim: true,
      minlength: [5, "Address must be at least 5 characters"],
      maxlength: [500, "Address cannot exceed 500 characters"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [0, "Total price cannot be negative"],
    },
    status: {
      type: String,
      required: [true, "Order status is required"],
      enum: {
        values: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        message:
          "Status must be one of 'pending', 'confirmed', 'shipped', 'delivered', or 'cancelled'",
      },
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: [true, "Payment reference is required"],
    },
    delivery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
      required: [true, "Delivery reference is required"],
    },
  },
  { timestamps: true }
);

// Create the Order model
const Order = mongoose.model("Order", orderSchema);

// ----- Joi Validation Function -----
function validateOrder(data) {
  const schema = Joi.object({
    user: Joi.string().hex().length(24).required(),
    products: Joi.array()
      .items(Joi.string().hex().length(24))
      .min(1)
      .required(),
    address: Joi.string().min(5).max(500).required(),
    totalPrice: Joi.number().min(0).required(),
    status: Joi.string()
      .valid("pending", "confirmed", "shipped", "delivered", "cancelled")
      .required(),
    payment: Joi.string().hex().length(24).required(),
    delivery: Joi.string().hex().length(24).required(),
  });

  return schema.validate(data);
}

module.exports = {
  Order,
  validateOrder,
};
