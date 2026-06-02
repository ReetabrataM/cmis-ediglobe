const Student = require("../models/Student");
const Faculty = require("../models/Faculty");

exports.getDashboardStats = async (
  req,
  res
) => {
  try {
    const students =
      await Student.countDocuments();

    const faculty =
      await Faculty.countDocuments();

    res.json({
      success: true,
      stats: {
        students,
        faculty,
        courses: 12,
        revenue: 250000,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};