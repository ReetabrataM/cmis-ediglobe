const Faculty = require("../models/Faculty");

// CREATE FACULTY
exports.addFaculty =
  async (req, res) => {
    try {
      const faculty =
        await Faculty.create(
          req.body
        );

      res.status(201).json({
        success: true,
        faculty,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// GET ALL FACULTY
exports.getFaculties =
  async (req, res) => {
    try {
      const faculties =
        await Faculty.find();

      res.json({
        success: true,
        faculties,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// GET SINGLE FACULTY
exports.getFaculty =
  async (req, res) => {
    try {
      const faculty =
        await Faculty.findById(
          req.params.id
        );

      if (!faculty) {
        return res
          .status(404)
          .json({
            message:
              "Faculty not found",
          });
      }

      res.json({
        success: true,
        faculty,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// UPDATE FACULTY
exports.updateFaculty =
  async (req, res) => {
    try {
      const faculty =
        await Faculty.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json({
        success: true,
        faculty,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// DELETE FACULTY
exports.deleteFaculty =
  async (req, res) => {
    try {
      await Faculty.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Faculty deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };