import express from "express";

 import { getSchedPanel, createSchedPanel, updateSchedPanel, deleteSchedPanel } from "../controllers/schedPanel.js";

const router = express.Router();
 import auth from "../middleware/auth.js";

router.get("/", getSchedPanel);
router.post("/", auth, createSchedPanel);
router.patch("/:id", auth, updateSchedPanel);
router.delete("/:id", auth, deleteSchedPanel);

export default router;
