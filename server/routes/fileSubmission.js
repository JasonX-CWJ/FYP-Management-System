import express from "express";

import { getFileSubmissions, createFileSubmissions, updateFileSubmissions, deleteFileSubmissions } from "../controllers/fileSubmission.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/:id", getFileSubmissions);
router.post("/", auth, createFileSubmissions);
router.patch("/:id", auth, updateFileSubmissions);
router.delete("/:id", auth, deleteFileSubmissions);

export default router;
