import express from "express";

import { getInfoGuide, createInfoGuide, updateInfoGuide, deleteInfoGuide } from "../controllers/infoGuide.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/", getInfoGuide);
router.post("/", auth, createInfoGuide);
router.patch("/:id", auth, updateInfoGuide);
router.delete("/:id", auth, deleteInfoGuide);

export default router;