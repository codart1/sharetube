import { createClient } from '@supabase/supabase-js';

export const supabasePrivate = createClient(
  'https://boogsnacscbfmgkulueq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvb2dzbmFjc2NiZm1na3VsdWVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1Njk5MDM5MSwiZXhwIjoxOTcyNTY2MzkxfQ.H2hNciZ8Yp8kYbUBOLAvY8al3XjDDp-RshgG648HqXE'
);
