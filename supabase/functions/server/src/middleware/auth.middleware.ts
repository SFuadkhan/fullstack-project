import { Request, Response, NextFunction } from "express";
import { getServiceClient } from "../config/supabase.js";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No authorization token provided" });
    }

    const supabase = getServiceClient();
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};