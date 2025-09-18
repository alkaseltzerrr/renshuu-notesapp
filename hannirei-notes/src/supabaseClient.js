import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://YOUR_PROJECT_ID.supabase.co'; // <-- Replace with your Supabase URL
const supabaseKey = 'YOUR_ANON_KEY'; // <-- Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
