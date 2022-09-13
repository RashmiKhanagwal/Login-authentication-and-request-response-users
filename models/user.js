const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
        role: {
            type: String,
            enum: ['hr','employee'],
            default: "employee",
            required: true
        },
        contact: {
            type: Number,
            required: true
        },
        dateOfJoining: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);