import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(
  'https://pidfgjqywchqcqdjhmsj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpZGZnanF5d2NocWNxZGpobXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ3NzQzNTUsImV4cCI6MTk3MDM1MDM1NX0.HY0mpzolDkg5TZ7_gim6i0mzXKbhCtIMJptgLcvdZv8'
);
