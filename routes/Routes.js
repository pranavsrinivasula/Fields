const express = require("express");
const router = express.Router();
const studentController = require("../controller/flow");

router.post("/", (req, res) => {
  const { action } = req.body;

  if (action === "add_fields") {
    return studentController.addFields(req, res);
  }

  if (action === "submit") {
    return studentController.submitStudents(req, res);
  }

  return res.status(400).json({ error: "Unknown action" });
});

module.exports = router;
