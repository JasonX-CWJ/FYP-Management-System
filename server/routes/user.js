import express from "express";
const router = express.Router();

import { signin, signup, updatePass } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/updatePass", updatePass);

export default router;
