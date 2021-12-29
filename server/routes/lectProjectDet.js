import express from "express";

 import { getLectProjectDet, createLectProjectDet, updateLectProjectDet, deleteLectProjectDet } from "../controllers/lectProjectDet.js";

const router = express.Router();
 import auth from "../middleware/auth.js";

router.get("/", getLectProjectDet);
router.post("/", auth, createLectProjectDet);
router.patch("/:id", auth, updateLectProjectDet);
router.delete("/:id", auth, deleteLectProjectDet);

export default router;
