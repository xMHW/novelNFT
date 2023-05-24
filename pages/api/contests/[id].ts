import { supabase } from "@/lib/supabase";

export default async function handler(req, res) {
    const { id } = req.query;
    const { data: contest, error } = await supabase.from("contests").select("*").eq("id", id);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(contest);
}