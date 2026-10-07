import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wdajwsuazubzahtbvebi.supabase.co";
const supabaseKey = "sb_publishable_kPIIVRFLF9Htnvl-6OxRBg_Z4qbPIqJ";

export const supabase = createClient(supabaseUrl, supabaseKey);