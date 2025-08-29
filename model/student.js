const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  students: [
    {
      name: { type: String, required: true },
      age: { type: Number, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", studentSchema);
