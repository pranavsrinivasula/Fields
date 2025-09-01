import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Dynamic Flow endpoint
app.post("/unlock-fields", (req, res) => {
  // WhatsApp sends user inputs here
  const { form } = req.body; // form values submitted by user
  const field1 = form?.field1 || "";
  const field2 = form?.field2 || "";

  // Determine if extra fields should be enabled
  const enableExtra = field1.trim() !== "" && field2.trim() !== "";

  // Respond with updated Flow JSON
  const responsePayload = {
    version: "7.2",
    data_api_version: "3.0",
    screen: {
      id: "FORM_SCREEN",
      title: "Conditional Fields",
      layout: {
        type: "SingleColumnLayout",
        children: [
          {
            type: "Form",
            name: "main_form",
            children: [
              {
                type: "TextInput",
                name: "field1",
                label: "Enter First Value",
                required: true,
                value: field1
              },
              {
                type: "TextInput",
                name: "field2",
                label: "Enter Second Value",
                required: true,
                value: field2
              },
              {
                type: "TextInput",
                name: "field3",
                label: "Third Field",
                enabled: enableExtra
              },
              {
                type: "TextInput",
                name: "field4",
                label: "Fourth Field",
                enabled: enableExtra
              }
            ]
          }
        ]
      }
    }
  };

  return res.json(responsePayload);
});

// Terminal screen endpoint (optional if Meta expects it)
app.post("/terminal", (req, res) => {
  return res.json({
    version: "7.2",
    data_api_version: "3.0",
    screen: {
      id: "TERMINAL",
      title: "Done",
      terminal: true,
      layout: {
        type: "SingleColumnLayout",
        children: [
          {
            type: "Text",
            text: "Thank you! Flow completed."
          }
        ]
      }
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Dynamic Flow API running on port ${PORT}`);
});
