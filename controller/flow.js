// controllers/flowController.js

export const unlockFields = (req, res) => {
  const { form } = req.body; // user input data
  const field1 = form?.field1 || "";
  const field2 = form?.field2 || "";

  const enableExtra = field1.trim() !== "" && field2.trim() !== "";

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
};

export const terminalScreen = (req, res) => {
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
};
