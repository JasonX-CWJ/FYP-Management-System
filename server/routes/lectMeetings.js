import express from "express";

import { getLectMeetings, createLectMeetings, updateLectMeetings, deleteLectMeetings, changeLectMeetingsStatus } from "../controllers/lectMeetings.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/", getLectMeetings);
router.post("/", auth, createLectMeetings);
router.patch("/:id", auth, updateLectMeetings);
router.delete("/:id", auth, deleteLectMeetings);
router.patch("/change/:id", auth, changeLectMeetingsStatus);

export default router;
