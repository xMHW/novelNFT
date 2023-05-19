import { supabase } from "@/lib/supabase";

export default async function handler(req, res) {
  const { data: posts, error } = await supabase.from("post").select("*");
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json(posts);
}
