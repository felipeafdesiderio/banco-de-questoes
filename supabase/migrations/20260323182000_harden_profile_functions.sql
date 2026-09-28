-- Harden trigger/helper functions (Supabase security advisor)

ALTER FUNCTION public.set_profiles_updated_at()
  SET search_path = public;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM anon, authenticated;
