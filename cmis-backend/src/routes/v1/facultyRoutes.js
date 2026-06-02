const express = require("express");

const router =
  express.Router();

const {
  addFaculty,
  getFaculties,
  getFaculty,
  updateFaculty,
  deleteFaculty,
} = require("../../controllers/facultyController");

router.post(
  "/",
  addFaculty
);

router.get(
  "/",
  getFaculties
);

router.get(
  "/:id",
  getFaculty
);

router.put(
  "/:id",
  updateFaculty
);

router.delete(
  "/:id",
  deleteFaculty
);

module.exports = router;