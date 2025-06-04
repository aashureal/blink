// models/payment.js

const mongoose = require("mongoose");
const Joi = require("joi");

// ----- Mongoose Schema with Validation -----
const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order reference is required for payment"],
    },
    amount: {
      type: Number,
      required: [true, "Payment amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    method: {
      type: String,
      required: [true, "Payment method is required"],
      trim: true,
    },
    status: {
      type: String,
      required: [true, "Payment status is required"],
    },
    transacionId: {
      type: String,
      required: [true, "Transaction ID is required"],
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Create the Payment model
const Payment = mongoose.model("Payment", paymentSchema);

// ----- Joi Validation Function -----
function validatePayment(data) {
  const schema = Joi.object({
    order: Joi.string().hex().length(24).required(),
    amount: Joi.number().min(0).required(),
    method: Joi.string().min(3).max(30).required(),
    status: Joi.string().required(),
    transacionId: Joi.string().required(),
  });

  return schema.validate(data);
}

module.exports = {
  Payment,
  validatePayment,
};
