const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // allow requests from frontend
app.use(bodyParser.json());

// Route to handle unlocking fields
app.post("/api/unlock-fields", (req, res) => {
  const { field1, field2 } = req.body;

  // Basic validation
  if (!field1 || !field2) {
    return res.status(400).json({ error: "Both fields must have values" });
  }

  // Respond with the fields to enable
  const updatedFields = [
    { name: "field3", enabled: true },
    { name: "field4", enabled: true }
  ];

  res.json({ formFields: updatedFields });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
