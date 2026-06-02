const mongoose = require("mongoose");

const markSchema =
  new mongoose.Schema(
    {
      student: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },

      course: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },

      assignment: {
        type: Number,
        default: 0,
      },

      quiz: {
        type: Number,
        default: 0,
      },

      midSemester: {
        type: Number,
        default: 0,
      },

      finalExam: {
        type: Number,
        default: 0,
      },

      totalMarks: {
        type: Number,
        default: 0,
      },

      grade: {
        type: String,
        default: "F",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Mark",
    markSchema
  );