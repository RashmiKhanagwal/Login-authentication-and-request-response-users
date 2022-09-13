const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    empId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    requestDocument: {
        type: String,
        enum: ['payslip','relieving letter'],
        required: true
    },
    requestDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending','approved'],
        default: "pending"
    },
    docfile: {
        type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);