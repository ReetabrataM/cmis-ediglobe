const Fee = require("../models/Fee");

const addFee = async (req, res) => {
  try {
    const student = await require("../models/Student").findById(
      req.body.student
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const fee = await Fee.create({
      student: req.body.student,
      department: student.department, // 🔥 AUTO LINK
      totalFees: req.body.totalFees,
      paidAmount: req.body.paidAmount,
      dueDate: req.body.dueDate,
    });

    res.status(201).json({ success: true, data: fee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFees = async (req, res) => {
  try {
    const fees = await Fee.find()
      .populate("student", "rollNumber department")
      .lean();

    res.json({ success: true, data: fees });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({ success: true, data: fee });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteFee = async (req, res) => {
  try {
    await Fee.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  addFee,
  getFees,
  updateFee,
  deleteFee,
};