import { createClient } from '@supabase/supabase-js'

const supabaseUrl =  'https://xekcswhdcmemcefgsook.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhla2Nzd2hkY21lbWNlZmdzb29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1NzU0NTYsImV4cCI6MjAzNDE1MTQ1Nn0.avLWaJvQmYcBvpUjrmqE4X0nITcB_SfDtl7U1q_EBWo'
export const supabase = createClient(supabaseUrl, supabaseKey)