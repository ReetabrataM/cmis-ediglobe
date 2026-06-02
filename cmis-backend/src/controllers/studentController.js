const Student = require("../models/Student");

// =========================
// ADD STUDENT
// =========================
exports.addStudent = async (
  req,
  res
) => {
  try {
    const student =
      await Student.create(
        req.body
      );

    res.status(201).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// GET ALL STUDENTS
// =========================
exports.getStudents = async (
  req,
  res
) => {
  try {
    const students =
      await Student.find().populate(
        "user"
      );

    res.json({
      success: true,
      students,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// GET STUDENT BY ID
// =========================
exports.getStudentById =
  async (req, res) => {
    try {
      const student =
        await Student.findById(
          req.params.id
        );

      if (!student) {
        return res
          .status(404)
          .json({
            message:
              "Student not found",
          });
      }

      res.json({
        success: true,
        student,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// =========================
// UPDATE STUDENT
// =========================
exports.updateStudent = async (
  req,
  res
) => {
  try {
    const student =
      await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!student) {
      return res.status(404).json({
        message:
          "Student not found",
      });
    }

    res.json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// DELETE STUDENT
// =========================
exports.deleteStudent = async (
  req,
  res
) => {
  try {
    const student =
      await Student.findByIdAndDelete(
        req.params.id
      );

    if (!student) {
      return res.status(404).json({
        message:
          "Student not found",
      });
    }

    res.json({
      success: true,
      message:
        "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};