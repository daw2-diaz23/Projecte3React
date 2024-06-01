import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xlzlbrpqbzrljvcbmmdp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsemxicnBxYnpybGp2Y2JtbWRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyNTM2MDgsImV4cCI6MjAzMjgyOTYwOH0.g-0-uYXr_fmNP-QenLyxcvH6OMYVgD8JX6zKCT7Kyjg';

export const supabase = createClient(supabaseUrl, supabaseKey);

console.log("conexion: ", supabase);