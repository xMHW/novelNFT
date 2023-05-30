import { supabase } from "@/lib/supabase";
import { v4 } from "uuid";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id } = req.query;
        const {
            url, userID, author, title, concept
        } = req.body;
        console.log("response from upload")
        const { data, error } = await supabase.from("contest_submissions").insert({ id: v4(), contest_id: id, user_id: userID, url: url, author: author, title: title, concept: concept }).select()
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json(data);
    } else if (req.method === 'GET') {
        const { id } = req.query;
        const { data: contest, error } = await supabase.from("contest_submissions").select("*").eq("contest_id", id);
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json(contest);
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}