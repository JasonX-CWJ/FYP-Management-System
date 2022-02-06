import express from "express";

import { getProjectRepo, createProjectRepo, updateProjectRepo, deleteProjectRepo, applyProject, approveProject } from "../controllers/projectRepo.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/", getProjectRepo);
router.post("/", auth, createProjectRepo);
router.patch("/:id", auth, updateProjectRepo);
router.delete("/:id", auth, deleteProjectRepo);
router.post("/apply/:projectid/:studentid", auth, applyProject);
router.patch("/approve/:id", auth, approveProject);

export default router;
