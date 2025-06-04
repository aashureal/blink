// models/admin.js

const mongoose = require("mongoose");
const Joi = require("joi");

// ----- Mongoose Schema with Validation -----
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: {
        values: ["superadmin", "admin", "moderator"],
        message: "Role must be one of 'superadmin', 'admin'",
      },
    },
  },
  { timestamps: true }
);

// Create the Admin model
const Admin = mongoose.model("Admin", adminSchema);

// ----- Joi Validation Function -----
function validateAdmin(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("superadmin", "admin").required(),
  });

  return schema.validate(data);
}

module.exports = {
  Admin,
  validateAdmin,
};
