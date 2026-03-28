// src/lib/supabase.js
// ─────────────────────────────────────────────────────────────────────────────
// SETUP INSTRUCTIONS:
// 1. Go to https://supabase.com → Create a new project
// 2. Go to Settings → API and copy your Project URL and anon key
// 3. Paste them below
//
// SUPABASE TABLES TO CREATE:
//
// Table: projects
//   id            uuid (default gen_random_uuid(), primary key)
//   created_at    timestamptz (default now())
//   title         text NOT NULL
//   category      text NOT NULL  -- 'Graphic Design' | 'Videography' | 'Photography'
//   description   text
//   concept       text
//   thumbnail_url text
//   media_url     text
//   tags          text[]
//   featured      boolean (default false)
//   published     boolean (default true)
//
// Table: testimonials
//   id        uuid (default gen_random_uuid(), primary key)
//   name      text NOT NULL
//   role      text
//   text      text NOT NULL
//
// STORAGE BUCKET:
//   Create a bucket called "portfolio-media" — set public access ON
//
// ROW LEVEL SECURITY:
//   projects: allow SELECT for everyone, allow INSERT/UPDATE/DELETE for authenticated users only
//   testimonials: same
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'YOUR_SUPABASE_URL'         // e.g. https://xxxx.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
