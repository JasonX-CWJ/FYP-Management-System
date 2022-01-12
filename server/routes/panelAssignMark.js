import express from "express";

import { getPanelAssignMark, createPanelAssignMark, updatePanelAssignMark, deletePanelAssignMark } from "../controllers/panelAssignMark.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/", getPanelAssignMark);
router.post("/", auth, createPanelAssignMark);
router.patch("/:id", auth, updatePanelAssignMark);
router.delete("/:id", auth, deletePanelAssignMark);

export default router;
