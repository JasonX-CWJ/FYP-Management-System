import express from "express";

import {
    getLectProjectDet,
    createLectProjectDet,
    updateLectProjectDet,
    deleteLectProjectDet,
    approveLectProjectDet,
    applyLectProject,
    getLectProjectApplied,
    approveLectProjectApplied,
} from "../controllers/lectProjectDet.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/", getLectProjectDet);
router.post("/", auth, createLectProjectDet);
router.patch("/:id", auth, updateLectProjectDet);
router.delete("/:id", auth, deleteLectProjectDet);
router.patch("/approve/:id", auth, approveLectProjectDet);

//student <-> lecturer
router.post("/apply/:projectid", applyLectProject);
router.get("/mystudents", getLectProjectApplied);
router.patch("/mystudents/:projectid", approveLectProjectApplied);

export default router;
