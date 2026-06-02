const router = require("express").Router();

const authMiddleware = require("../../middlewares/authMiddleware");

router.get(
  "/protected",
  authMiddleware,
  (req, res) => {
    res.json({
      success: true,
      message: "Protected route accessed",
      user: req.user,
    });
  }
);

module.exports = router;