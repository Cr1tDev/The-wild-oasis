import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sgljjkqeopcunmlxmrmf.supabase.co";
const supabaseKey = "sb_publishable_vOjXV6k4rgN8Q8M-TK4w0A_usps7l8n";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
