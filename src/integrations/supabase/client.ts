
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zksdcehnfspmcxzwnxbk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inprc2RjZWhuZnNwbWN4endueGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MjY5NDMsImV4cCI6MjA2MTAwMjk0M30.A7bUYZLbApQpSFe_W8JNeah2W21BAPJu7QL78TFxgEU";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'supabase-auth',
  },
});
