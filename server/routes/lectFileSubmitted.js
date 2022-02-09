import express from "express";

import { getLectFileSubmitted, createLectFileSubmitted, updateLectFileSubmitted, deleteLectFileSubmitted } from "../controllers/lectFileSubmitted.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/:id", getLectFileSubmitted);
router.post("/", auth, createLectFileSubmitted);
router.patch("/:id", auth, updateLectFileSubmitted);
router.delete("/:id", auth, deleteLectFileSubmitted);

export default router;
