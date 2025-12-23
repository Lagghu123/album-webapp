# Memoria - Secure Shared Photo Album

Memoria is a modern, privacy-focused photo sharing application featuring a beautiful dark-mode UI, shared albums, and granular access control.

**Now powered by Supabase for Real Database & Auth!**

## 🚀 Features

*   **Authentication:** Real Sign Up/Login using Supabase Auth.
*   **Real Database:** Albums and Users stored in PostgreSQL.
*   **Photo Upload:** Upload photos directly to Supabase Storage.
*   **Modern UI:** Glassmorphism design, fully responsive.

---

## 🛠 Tech Stack

*   **Frontend:** React, Vite, Tailwind CSS
*   **Backend:** Supabase (Auth, Database, Storage)
*   **Language:** TypeScript

---

## 📦 Setup Instructions

### 1. Supabase Setup

1.  Create a project at [Supabase.com](https://supabase.com).
2.  Go to the **SQL Editor** and run the following script to set up your tables:

```sql
-- 1. Users Profile Table (Public profile linked to Auth)
create table public.users (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  role text default 'User',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Albums Table
create table public.albums (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  owner_id uuid references public.users(id),
  cover_url text,
  is_private boolean default true,
  is_shared boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Photos Table
create table public.photos (
  id uuid default gen_random_uuid() primary key,
  album_id uuid references public.albums(id),
  url text not null,
  alt text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enable Row Level Security (RLS) - Basic Policy
alter table public.users enable row level security;
create policy "Public profiles are viewable by everyone." on public.users for select using (true);
create policy "Users can insert their own profile." on public.users for insert with check (auth.uid() = id);

alter table public.albums enable row level security;
create policy "Albums are viewable by everyone (for demo)." on public.albums for select using (true);
create policy "Users can insert albums." on public.albums for insert with check (auth.uid() = owner_id);

-- 5. Storage
-- Go to Storage > Create a new bucket named 'photos'.
-- Set it to 'Public'.
```

### 2. Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`. You can now Register a new account and Create Albums that persist in the database!
