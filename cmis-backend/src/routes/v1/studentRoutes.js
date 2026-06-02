const express = require("express");

const router = express.Router();

const studentController = require(
  "../../controllers/studentController"
);

const authMiddleware = require(
  "../../middlewares/authMiddleware"
);

const roleMiddleware = require(
  "../../middlewares/roleMiddleware"
);

// CREATE STUDENT
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  studentController.addStudent
);

// GET ALL STUDENTS
router.get(
  "/",
  authMiddleware,
  studentController.getStudents
);

// GET SINGLE STUDENT
router.get(
  "/:id",
  authMiddleware,
  studentController.getStudentById
);

// UPDATE STUDENT
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  studentController.updateStudent
);

// DELETE STUDENT
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  studentController.deleteStudent
);

module.exports = router;