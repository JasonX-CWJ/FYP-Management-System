import express from "express";

import { getPanelVote, createPanelVote, updatePanelVote, deletePanelVote } from "../controllers/panelVote.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/", getPanelVote);
router.post("/", auth, createPanelVote);
router.patch("/:id", auth, updatePanelVote);
router.delete("/:id", auth, deletePanelVote);

export default router;
