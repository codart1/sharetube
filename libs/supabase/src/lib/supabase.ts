import { createClient } from '@supabase/supabase-js';
class Supabase {
  readonly client = createClient(
    'https://boogsnacscbfmgkulueq.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvb2dzbmFjc2NiZm1na3VsdWVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY5OTAzOTEsImV4cCI6MTk3MjU2NjM5MX0.BJXVI3GjZjvtOaWDL13bht5wE-aG7FMyfHprHF04zlk'
  );
}

export const supabase = new Supabase();
