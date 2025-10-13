
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qewyniuqkyeaifamyeaz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFld3luaXVxa3llYWlmYW15ZWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNjMzMTUsImV4cCI6MjA3NTgzOTMxNX0.4_mHRiHW9d16agHPvYL6eWmqizn2ISHeKCJTOmpC-HE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;