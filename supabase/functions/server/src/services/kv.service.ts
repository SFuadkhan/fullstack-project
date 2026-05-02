import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const client = () =>
  createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

export const set = async (key: string, value: any): Promise<void> => {
  const { error } = await client()
    .from("kv_store_3e0adeba")
    .upsert({ key, value });

  if (error) throw new Error(error.message);
};

export const get = async (key: string): Promise<any> => {
  const { data, error } = await client()
    .from("kv_store_3e0adeba")
    .select("value")
    .eq("key", key)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data?.value;
};

export const del = async (key: string): Promise<void> => {
  const { error } = await client()
    .from("kv_store_3e0adeba")
    .delete()
    .eq("key", key);

  if (error) throw new Error(error.message);
};

export const mset = async (keys: string[], values: any[]): Promise<void> => {
  const payload = keys.map((k, i) => ({ key: k, value: values[i] }));

  const { error } = await client()
    .from("kv_store_3e0adeba")
    .upsert(payload);

  if (error) throw new Error(error.message);
};

export const mget = async (keys: string[]): Promise<any[]> => {
  const { data, error } = await client()
    .from("kv_store_3e0adeba")
    .select("value")
    .in("key", keys);

  if (error) throw new Error(error.message);
  return data?.map((d) => d.value) ?? [];
};

export const mdel = async (keys: string[]): Promise<void> => {
  const { error } = await client()
    .from("kv_store_3e0adeba")
    .delete()
    .in("key", keys);

  if (error) throw new Error(error.message);
};

export const getByPrefix = async (prefix: string): Promise<any[]> => {
  const { data, error } = await client()
    .from("kv_store_3e0adeba")
    .select("key, value")
    .like("key", `${prefix}%`);

  if (error) throw new Error(error.message);
  return data?.map((d) => d.value) ?? [];
};