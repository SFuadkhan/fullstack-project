import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

export const getServiceClient = () =>
  createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

export const getAnonClient = () =>
  createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );