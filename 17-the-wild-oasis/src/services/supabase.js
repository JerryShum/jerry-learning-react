import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://wecgkejpalbxnwehievg.supabase.co";
const supabaseKey =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlY2drZWpwYWxieG53ZWhpZXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyMDg1MTUsImV4cCI6MjA0NTc4NDUxNX0.5IVJOEiUxjJtZYNmV7s3kB2mSWXkMAzh8OsSJAVcNZY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
