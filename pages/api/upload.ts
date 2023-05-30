import formidable from 'formidable';
import { supabase } from '@/lib/supabase';
import fs from 'fs';

export const config = {
    api: {
      bodyParser: false,
    },
  };
  
  export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log("In POST Request")
        const form = new formidable.IncomingForm();
        console.log("form created")
        console.log(form)

        form.parse(req, async (err, fields, files) => {
            if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to process form data.' });
            }
            console.log("form parsed")
            console.log(files)
            

            const file = files.file;

            if (!file) {
            return res.status(400).json({ error: 'No file provided.' });
            }

            const filePath = file.path;
            const fileName = file.originalFilename;
            console.log("file")
            console.log(file)
            console.log("fileName")
            console.log(fileName)

            const readStream = fs.createReadStream(file.filepath)

            const { data, error } = await supabase.storage.from('contest_submissions').upload(fileName, readStream);

            if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to upload file to Supabase storage.' });
            }

            return res.status(200).json({ url: data.path });
        });
        } else {
        res.status(405).json({ error: 'Method not allowed.' });
        }
  }