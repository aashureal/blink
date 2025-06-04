// models/delivery.js

const mongoose = require("mongoose");
const Joi = require("joi");

// ----- Mongoose Schema with Validation -----
const deliverySchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order reference is required for delivery"],
    },
    deliveryBoy: {
      type: String,
      required: [true, "Delivery boy name is required"],
      trim: true,
      minlength: [3, "Delivery boy name must be at least 3 characters"],
      maxlength: [100, "Delivery boy name cannot exceed 100 characters"],
    },
    status: {
      type: String,
      required: [true, "Delivery status is required"],
      enum: {
        values: ["pending", "in_transit", "delivered", "cancelled"],
        message:
          "Status must be one of 'pending', 'in_transit', 'delivered', or 'cancelled'",
      },
    },
    trackingURL: {
      type: String,
      required: [true, "Tracking URL is required"],
      trim: true,
    },
    estimatedDeliveryTime: {
      type: Number,
      required: [true, "Estimated delivery time is required"],
      min: [0, "Estimated delivery time cannot be negative"],
    },
  },
  { timestamps: true }
);

// Create the Delivery model
const Delivery = mongoose.model("Delivery", deliverySchema);

// ----- Joi Validation Function -----
function validateDelivery(data) {
  const schema = Joi.object({
    order: Joi.string().hex().length(24).required(),
    deliveryBoy: Joi.string().min(3).max(100).required(),
    status: Joi.string()
      .valid("pending", "in_transit", "delivered", "cancelled")
      .required(),
    trackingURL: Joi.string().uri().required(),
    estimatedDeliveryTime: Joi.number().min(0).required(),
  });

  return schema.validate(data);
}

module.exports = {
  Delivery,
  validateDelivery,
};
