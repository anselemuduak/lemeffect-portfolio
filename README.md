# LemEffect Portfolio — Setup Guide

A premium full-stack portfolio built with **React + Vite + Supabase**, deployable to **Vercel** in under 30 minutes.

---

## Stack
- **Frontend**: React 18 + Vite
- **Backend/DB**: Supabase (Auth + PostgreSQL + Storage)
- **Hosting**: Vercel (free tier)
- **Fonts**: Sora, Nunito, Poppins (Google Fonts)

---

## Quick Start

### 1. Install dependencies
```bash
npm install
npm run dev
```

### 2. Set up Supabase
1. Go to https://supabase.com → Create new project
2. Go to **Table Editor** → Create these tables:

#### Table: `projects`
| Column | Type | Default | Notes |
|---|---|---|---|
| id | uuid | gen_random_uuid() | Primary key |
| created_at | timestamptz | now() | |
| title | text | — | NOT NULL |
| category | text | — | 'Graphic Design' / 'Videography' / 'Photography' |
| description | text | — | |
| concept | text | — | Optional |
| thumbnail_url | text | — | |
| media_url | text | — | |
| tags | text[] | '{}' | |
| featured | boolean | false | |
| published | boolean | true | |

#### Table: `testimonials`
| Column | Type | Default |
|---|---|---|
| id | uuid | gen_random_uuid() |
| created_at | timestamptz | now() |
| name | text | |
| role | text | |
| text | text | |

### 3. Set up Storage
1. Go to **Storage** → Create bucket: `portfolio-media`
2. Set bucket to **Public**

### 4. Row Level Security (RLS)
In SQL editor, run:
```sql
-- Projects: public read, auth write
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON projects FOR SELECT USING (published = true);
CREATE POLICY "Auth write" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- Testimonials: public read, auth write
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON testimonials FOR SELECT TO anon USING (true);
CREATE POLICY "Auth write" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
```

### 5. Create Admin User
In Supabase → **Authentication** → **Users** → Add User:
- Email: your email
- Password: your secure password

### 6. Connect Supabase to your app
In `src/lib/supabase.js`:
```js
const SUPABASE_URL = 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key'
```
(Find both in Supabase → Settings → API)

---

## Deploy to Vercel
1. Push this folder to a GitHub repo
2. Go to https://vercel.com → Import project
3. Vercel auto-detects Vite — just click Deploy
4. Add env variables if needed (optional — keys are in supabase.js for now)

---

## Admin Usage
1. On the live site, click the small **Admin** button in the top right nav
2. Log in with your Supabase auth credentials
3. Add projects with title, category, description, media upload, and featured toggle
4. Projects appear instantly on the live site

---

## Color Palette
| Token | Hex |
|---|---|
| Primary Purple | `#5D3FD3` |
| Aqua Accent | `#3DD9D6` |
| Background | `#F2F2F2` |
| Highlight Yellow | `#FCD34D` |
| Dark Base | `#0D0D1A` |

---

## Contact
LemEffect · Port Harcourt, Nigeria
WhatsApp: 07137014327
