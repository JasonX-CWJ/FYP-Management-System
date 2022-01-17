import express from "express";

import { getLectMeetings, createLectMeetings, updateLectMeetings, deleteLectMeetings } from "../controllers/lectMeetings.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/", getLectMeetings);
router.post("/", auth, createLectMeetings);
router.patch("/:id", auth, updateLectMeetings);
router.delete("/:id", auth, deleteLectMeetings);

export default router;
