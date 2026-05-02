import { Router } from "express";
import { signup, signin, getUser } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/user", requireAuth, getUser);

export default router;