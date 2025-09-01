// routes/flowRoutes.js

import express from "express";
import { unlockFields, terminalScreen } from "../controllers/flowController.js";

const router = express.Router();

// Dynamic Flow endpoint
router.post("/unlock-fields", unlockFields);

// Terminal screen (optional)
router.post("/terminal", terminalScreen);

export default router;
