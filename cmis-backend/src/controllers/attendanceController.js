const Attendance = require("../models/Attendance");

exports.getAttendance = async (
  req,
  res
) => {
  try {
    const attendance =
      await Attendance.find()
        .populate("course")
        .populate(
          "records.student"
        )
        .sort({
          createdAt: -1,
        });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.markAttendance = async (
  req,
  res
) => {
  try {
    const attendance =
      await Attendance.create(
        req.body
      );

    res.status(201).json(
      attendance
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};