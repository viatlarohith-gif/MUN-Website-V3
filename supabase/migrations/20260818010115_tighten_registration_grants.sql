/*
# Tighten registration table privileges

1. Security Changes
- Revoke SELECT, UPDATE, DELETE from anon and authenticated on mun_registrations.
- Grant only INSERT to anon and authenticated (public registration submission).
- Policies already deny read/update/delete via USING (false); this aligns grants with that intent.

2. Important Notes
- Delegates can submit registrations but cannot read, edit, or delete any registration data.
- Organizer access will be added later via an authenticated dashboard with proper role checks.
*/

REVOKE SELECT, UPDATE, DELETE ON public.mun_registrations FROM anon;
REVOKE SELECT, UPDATE, DELETE ON public.mun_registrations FROM authenticated;
GRANT INSERT ON public.mun_registrations TO anon;
GRANT INSERT ON public.mun_registrations TO authenticated;
