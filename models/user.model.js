// models/user.js

const mongoose = require("mongoose");
const Joi = require("joi");

// ----- Mongoose Schemas with Validation -----
const addressSchema = new mongoose.Schema({
  state: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  zip: {
    type: Number,
    min: 10000,
    max: 999999,
  },
  city: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  street: {
    type: String,
    trim: true,
    maxlength: 200,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
      trim: true,
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
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^\d{10,15}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    addresses: {
      type: [addressSchema],
      validate: {
        validator: (arr) => Array.isArray(arr),
        message: "Addresses must be an array",
      },
    },
  },
  { timestamps: true }
);

// Create the User model
const User = mongoose.model("User", userSchema);

// ----- Joi Validation Function -----
function validateUser(data) {
  const addressJoi = Joi.object({
    state: Joi.string().max(100).allow("", null),
    zip: Joi.number().min(10000).max(999999),
    city: Joi.string().max(100).allow("", null),
    street: Joi.string().max(200).allow("", null),
  });

  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string()
      .pattern(/^\d{10,15}$/)
      .required(),
    addresses: Joi.array().items(addressJoi),
  });

  return schema.validate(data);
}

module.exports = {
  User,
  validateUser,
};
