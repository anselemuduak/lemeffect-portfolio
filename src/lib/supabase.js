import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://lyostqntbqbbdelmuacr.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5b3N0cW50YnFiYmRlbG11YWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2NTIxMTYsImV4cCI6MjA5MDIyODExNn0.WcpCQQSn9_r_MMCKCszrwQ4UCO1lbUkIl4Q_tvNAlZw'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
