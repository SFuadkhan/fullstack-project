import { Request, Response } from "express";
import { getServiceClient, getAnonClient } from "../config/supabase.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await getServiceClient().auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true,
    });

    if (error) return res.status(400).json({ error: error.message });

    res.json({
      message: "User created successfully",
      user: {
        id: data.user.id,
        email: data.user.email,
        name,
      },
    });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await getAnonClient().auth.signInWithPassword({
      email,
      password,
    });

    if (error) return res.status(401).json({ error: error.message });

    res.json({
      access_token: data.session.access_token,
      user: data.user,
    });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUser = (req: Request, res: Response) => {
  res.json({ user: req.user });
};