const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    totalFees: { type: Number, required: true },

    paidAmount: { type: Number, default: 0 },

    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fee", feeSchema);