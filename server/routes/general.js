import express from "express";

import { getLecturers, getStudents } from "../controllers/general.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/getlecturers", getLecturers);
router.get("/getstudents", getStudents);
// router.post("/", auth, createInfoGuide);
// router.patch("/:id", auth, updateInfoGuide);
// router.delete("/:id", auth, deleteInfoGuide);

export default router;
