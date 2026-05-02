import { Router } from "express";
import {
  submitContact,
  getSubmissions,
} from "../controllers/contact.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", submitContact);
router.get("/submissions", requireAuth, getSubmissions);

export default router;