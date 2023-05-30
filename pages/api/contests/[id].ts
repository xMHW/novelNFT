import { supabase } from "@/lib/supabase";

async function uploadFile(fileName, file) {
    console.log(fileName)
    console.log(file)
    const { data, error } = await supabase.storage.from('contest_submissions').upload(fileName, file) 
    if (error) {
        console.log(error)
        return {"success": false, "error": error}
    } else {
        const filepath = data.path
        console.log(data)
        return {"success": true, "filepath": filepath}
    }
}

export default async function handler(req, res) {
    const { id } = req.query;
    if (req.method === 'POST') {
        console.log("In POST Request")
        console.log(req)
        // add to storage and get url
        const uploadResponse = await uploadFile('test.png', req.body.file)
        if (uploadResponse.success) {
            const { error } = await supabase.from("contest_submissions").insert({ id: 2, contest_id: id, user_id: "b518694f-02e0-488a-b497-005b002a290e", url: uploadResponse.filepath })
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(200);
        } else {
            return res.status(500).json({ error: uploadResponse.error });
        }
    } else if (req.method === 'GET') {
        const { data: contest, error } = await supabase.from("contests").select("*").eq("id", id);
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json(contest);
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}