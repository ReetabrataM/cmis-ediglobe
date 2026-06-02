const Mark = require("../models/Mark");

exports.getMarks = async (req, res) => {
  try {
    const marks = await Mark.find()
      .populate("student")
      .populate("course");

    res.json(marks);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.createMark = async (req, res) => {
  try {
    const {
      assignment,
      quiz,
      midSemester,
      finalExam,
    } = req.body;

    const total =
      Number(assignment || 0) +
      Number(quiz || 0) +
      Number(midSemester || 0) +
      Number(finalExam || 0);

    let grade = "F";

    if (total >= 90) grade = "A+";
    else if (total >= 80) grade = "A";
    else if (total >= 70) grade = "B";
    else if (total >= 60) grade = "C";
    else if (total >= 50) grade = "D";

    const mark = await Mark.create({
      ...req.body,
      totalMarks: total,
      grade,
    });

    res.status(201).json(mark);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateMark = async (req, res) => {
  try {
    const {
      assignment,
      quiz,
      midSemester,
      finalExam,
    } = req.body;

    const total =
      Number(assignment || 0) +
      Number(quiz || 0) +
      Number(midSemester || 0) +
      Number(finalExam || 0);

    let grade = "F";

    if (total >= 90) grade = "A+";
    else if (total >= 80) grade = "A";
    else if (total >= 70) grade = "B";
    else if (total >= 60) grade = "C";
    else if (total >= 50) grade = "D";

    const updatedMark =
      await Mark.findByIdAndUpdate(
        req.params.id,
        {
          assignment,
          quiz,
          midSemester,
          finalExam,
          totalMarks: total,
          grade,
        },
        {
          new: true,
        }
      )
        .populate("student")
        .populate("course");

    res.json(updatedMark);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.bulkSaveMarks = async (req, res) => {
  try {
    const { course, records } = req.body;

    for (const item of records) {
      const total =
        Number(item.assignment || 0) +
        Number(item.quiz || 0) +
        Number(item.midSemester || 0) +
        Number(item.finalExam || 0);

      let grade = "F";

      if (total >= 90) grade = "A+";
      else if (total >= 80) grade = "A";
      else if (total >= 70) grade = "B";
      else if (total >= 60) grade = "C";
      else if (total >= 50) grade = "D";

      const existing = await Mark.findOne({
        student: item.student,
        course,
      });

      if (existing) {
        existing.assignment =
          item.assignment || 0;

        existing.quiz =
          item.quiz || 0;

        existing.midSemester =
          item.midSemester || 0;

        existing.finalExam =
          item.finalExam || 0;

        existing.totalMarks = total;
        existing.grade = grade;

        await existing.save();
      } else {
        await Mark.create({
          student: item.student,
          course,
          assignment:
            item.assignment || 0,
          quiz: item.quiz || 0,
          midSemester:
            item.midSemester || 0,
          finalExam:
            item.finalExam || 0,
          totalMarks: total,
          grade,
        });
      }
    }

    res.json({
      success: true,
      message:
        "Marks saved successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteMark = async (req, res) => {
  try {
    await Mark.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Mark deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};