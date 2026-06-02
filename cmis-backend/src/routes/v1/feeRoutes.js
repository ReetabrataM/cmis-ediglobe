const express = require("express");
const router = express.Router();

const {
  addFee,
  getFees,
  updateFee,
  deleteFee,
} = require("../../controllers/feeController"); // ✅ FIXED PATH

const authMiddleware = require("../../middlewares/authMiddleware");
const roleMiddleware = require("../../middlewares/roleMiddleware");

// ➤ CREATE
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  addFee
);

// ➤ READ
router.get(
  "/",
  authMiddleware,
  getFees
);

// ➤ UPDATE
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateFee
);

// ➤ DELETE
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteFee
);

module.exports = router;