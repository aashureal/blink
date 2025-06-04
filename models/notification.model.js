// models/notification.js

const mongoose = require("mongoose");
const Joi = require("joi");

// ----- Mongoose Schema with Validation -----
const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required for notification"],
    },
    message: {
      type: String,
      required: [true, "Notification message is required"],
      trim: true,
      minlength: [1, "Message must be at least 1 character"],
      maxlength: [500, "Message cannot exceed 500 characters"],
    },
  },
  { timestamps: true }
);

// Create the Notification model
const Notification = mongoose.model("Notification", notificationSchema);

// ----- Joi Validation Function -----
function validateNotification(data) {
  const schema = Joi.object({
    user: Joi.string().hex().length(24).required(),
    message: Joi.string().min(1).max(500).required(),
  });

  return schema.validate(data);
}

module.exports = {
  Notification,
  validateNotification,
};
