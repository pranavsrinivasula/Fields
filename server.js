const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const studentFlow = require("./routes/Routes");

const app = express();
app.use(bodyParser.json());


// Routes
app.use("/student-flow", studentFlow);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
