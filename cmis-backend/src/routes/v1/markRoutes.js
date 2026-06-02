const express = require("express");

const router = express.Router();

const {
  getMarks,
  createMark,
  updateMark,
  deleteMark,
  bulkSaveMarks,
} = require("../../controllers/markController");

// Get all marks
router.get(
  "/",
  getMarks
);

// Create single mark
router.post(
  "/",
  createMark
);

// Bulk save marks
router.post(
  "/bulk-save",
  bulkSaveMarks
);

// Update mark
router.put(
  "/:id",
  updateMark
);

// Delete mark
router.delete(
  "/:id",
  deleteMark
);

module.exports = router;