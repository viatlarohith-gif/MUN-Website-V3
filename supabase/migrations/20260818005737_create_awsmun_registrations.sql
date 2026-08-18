/*
# Create AWS MUN Edition 4 registrations

1. New Tables
- `mun_registrations` stores delegate registration submissions for AWS MUN Edition 4.
- `id` uniquely identifies each submission.
- `full_name`, `email`, `phone`, `school`, and `city` store delegate contact details.
- `committee` stores the selected committee.
- `experience` stores the delegate's prior MUN experience.
- `created_at` records when the registration was submitted.

2. Security
- Row-level security is enabled on the registration table.
- Anonymous visitors can submit registrations but cannot read, edit, or delete registration data.
- Authenticated access is also denied by default until an organizer dashboard is added.

3. Important Notes
- This is a single-conference registration table and intentionally has no user account requirement.
- Registration data is not exposed to the public browser after submission.
*/

CREATE TABLE IF NOT EXISTS public.mun_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  school text NOT NULL,
  city text NOT NULL,
  committee text NOT NULL CHECK (committee IN ('DISEC', 'UNHRC', 'UNCSW', 'IPC', 'AIPPM')),
  experience text NOT NULL CHECK (experience IN ('First conference', '1–2 conferences', '3+ conferences')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.mun_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can submit registrations" ON public.mun_registrations;
CREATE POLICY "Public can submit registrations"
ON public.mun_registrations FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Public cannot read registrations" ON public.mun_registrations;
CREATE POLICY "Public cannot read registrations"
ON public.mun_registrations FOR SELECT
TO anon, authenticated
USING (false);

DROP POLICY IF EXISTS "Public cannot update registrations" ON public.mun_registrations;
CREATE POLICY "Public cannot update registrations"
ON public.mun_registrations FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "Public cannot delete registrations" ON public.mun_registrations;
CREATE POLICY "Public cannot delete registrations"
ON public.mun_registrations FOR DELETE
TO anon, authenticated
USING (false);
