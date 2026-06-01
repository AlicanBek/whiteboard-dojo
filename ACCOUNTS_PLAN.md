# Accounts & Saved Boards — Implementation Plan

Add user accounts (email + password), multiple boards per user, and save/load —
**without leaving the static GitHub Pages setup**. A hosted backend (Supabase)
handles auth + database; the browser talks to it directly via the Supabase JS SDK.

## Architecture at a glance

```
  Static site (GitHub Pages, your domain)
        │  Supabase JS SDK (UMD build via CDN — no build step)
        ▼
  Supabase project
    ├─ Auth        (email + password, sessions, reset emails)
    └─ Postgres    (boards table) + Row-Level Security (per-user isolation)
```

Why this is safe from the browser: the Supabase **anon key is meant to be public**;
**Row-Level Security (RLS)** policies enforce that each user can only touch their own rows.

---

## 1. Supabase setup (one-time — you do this in the dashboard, I'll guide)

1. Create a free project at supabase.com → note the **Project URL** and **anon public key**.
2. Auth → Providers → enable **Email**. For fast dev, optionally turn **"Confirm email" OFF**
   initially (turn it back on before launch).
3. Auth → URL config → add allowed redirect URLs: `http://localhost:8765` (dev) and
   `https://www.whiteboarddojo.com` (prod).
4. Run this SQL (SQL Editor):

```sql
create table boards (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  title       text not null default 'Untitled board',
  data        jsonb not null default '{"objects":[]}',
  thumbnail   text,                       -- small PNG data URL (optional, phase 4)
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table boards enable row level security;

create policy "own boards - select" on boards for select using (auth.uid() = user_id);
create policy "own boards - insert" on boards for insert with check (auth.uid() = user_id);
create policy "own boards - update" on boards for update using (auth.uid() = user_id);
create policy "own boards - delete" on boards for delete using (auth.uid() = user_id);

-- keep updated_at fresh
create or replace function set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;
create trigger boards_updated_at before update on boards
  for each row execute function set_updated_at();
```

---

## 2. Client code (new files, no build step)

Load the SDK once per page that needs it (UMD global keeps our classic scripts working):
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

- **`js/supabase.js`** — creates the shared client from URL + anon key, exposes `window.sb`.
- **`js/auth.js`** — `signUp`, `signIn`, `signOut`, `getUser`, `onChange`; renders the
  account state (signed-out → "Sign in"; signed-in → email + "My boards" + "Sign out").
- **`js/boards.js`** — data layer: `listBoards()`, `getBoard(id)`, `createBoard(title)`,
  `updateBoard(id, {title, data, thumbnail})`, `deleteBoard(id)`.

The board's `data` is exactly what we already produce for undo/redo:
`{ objects: canvas.getObjects().map(o => o.toObject()) }`. Loading = `enlivenObjects`
back onto the canvas (the page/grid is recreated locally by `createPage()` as today).

---

## 3. New / changed pages

- **`/login/` (new)** — branded sign-in + sign-up forms. On success → redirect to `/boards/`
  (or back to a `?next=` target). Password reset link.
- **`/boards/` (new)** — "My Boards" dashboard (auth required, else redirect to `/login/`):
  grid of boards (title, last-updated, thumbnail), **New board**, **Open**, **Rename**, **Delete**.
  New board → insert row → open `/whiteboard/?board=<id>`.
- **`/whiteboard/` (changed)**:
  - Reads `?board=<id>`. If present + signed in → load that board's objects, show its title.
  - No id / signed out → today's free local canvas + a subtle "Sign in to save" prompt.
  - Top bar gains: editable **board title**, a **Save** button, and an **account menu**
    (email · My boards · Sign out).
- **Homepage / nav (changed)** — add "Sign in" or "My boards" depending on auth state.

---

## 4. Build phases (each independently testable)

- **Phase 1 — Auth foundation:** Supabase client, `/login/` page, sign up / in / out,
  session-aware nav. _Done = I can create an account and see signed-in state._
- **Phase 2 — Boards dashboard:** `boards.js` + `/boards/` (list, create, open, delete).
  _Done = create a board and land on the whiteboard with its id._
- **Phase 3 — Save / load:** whiteboard loads a board, Save persists objects, title editing.
  _Done = draw, save, reload, drawing returns; switch between multiple boards._
- **Phase 4 — Polish:** thumbnails, autosave (debounced), "sign in to save" prompts,
  rename inline, account menu, email confirmation ON.

---

## 5. Notes & decisions

- **Secrets:** only the anon key lives client-side (public by design); RLS is the real guard.
  No service-role key in the browser, ever.
- **Logged-out users** keep the full free whiteboard; accounts only add saving.
- **Email confirmation:** off for dev speed, on before launch.
- **Cost:** Supabase free tier is plenty to start; custom domain & Pages unchanged.
- **Open question for later:** also persist zoom/pan per board? (MVP stores objects only.)
