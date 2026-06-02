const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: true,
      unique: true,
    },

    courseName: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    credits: {
      type: Number,
      default: 3,
    },

    semester: {
      type: Number,
      required: true,
    },

    faculty: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Course",
  courseSchema
);