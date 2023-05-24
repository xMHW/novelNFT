import { supabase } from "@/lib/supabase";

export default async function handler(req, res) {
  const { data: contests, error } = await supabase.from("contests").select("*");
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json(contests);
}
