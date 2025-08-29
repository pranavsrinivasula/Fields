const Student = require("../model/student");

// Track student count per session (for demo, in memory)
let studentCount = 1;

exports.addFields = (req, res) => {
  studentCount++;
  const newFields = [
    {
      type: "TextInput",
      label: `Student Name ${studentCount}`,
      name: `name_${studentCount}`,
      required: true
    },
    {
      type: "TextInput",
      label: `Student Age ${studentCount}`,
      name: `age_${studentCount}`,
      required: true
    }
  ];

  return res.json({
    screen: {
      id: "student_screen",
      dynamic_updates: {
        add_children: newFields
      }
    }
  });
};

exports.submitStudents = async (req, res) => {
  try {
    const { userId, form } = req.body;
    const students = [];

    const formKeys = Object.keys(form);
    for (let i = 0; i < formKeys.length; i += 2) {
      const nameKey = formKeys[i];
      const ageKey = formKeys[i + 1];
      if (nameKey && ageKey) {
        students.push({
          name: form[nameKey],
          age: parseInt(form[ageKey])
        });
      }
    }

    const entry = new Student({ userId: userId || "demo_user", students });
    await entry.save();

    return res.json({ success: true, message: "Students saved successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error saving data" });
  }
};
