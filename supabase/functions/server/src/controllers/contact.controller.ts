import { Request, Response } from "express";
import * as kv from "../services/kv.service.js";

export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const submissionId = `contact_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 9)}`;

    const submission = {
      id: submissionId,
      name,
      email,
      subject: subject || "No subject",
      message,
      timestamp: new Date().toISOString(),
      status: "new",
    };

    await kv.set(submissionId, submission);

    res.json({ message: "Submitted", submissionId });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await kv.getByPrefix("contact_");
    res.json({ submissions });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};