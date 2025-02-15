-- Create the auth hook function
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
    claims jsonb;
    user_role VARCHAR;
BEGIN
    -- Fetch the user role in the user_roles table
    SELECT role INTO user_role 
    FROM public.profiles 
    WHERE user_id = (event->>'user_id')::uuid 
    AND is_active IS TRUE;

    claims := event->'claims';

    IF user_role IS NOT NULL THEN
        -- Set the claim
        claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    ELSE
        claims := jsonb_set(claims, '{user_role}', 'null');
    END IF;

    -- Update the 'claims' object in the original event
    event := jsonb_set(event, '{claims}', claims);

    -- Return the modified or original event
    RETURN event;
END;
$$;

GRANT USAGE ON SCHEMA public TO supabase_auth_admin;

GRANT EXECUTE 
    ON FUNCTION public.custom_access_token_hook 
    TO supabase_auth_admin;

REVOKE EXECUTE 
    ON FUNCTION public.custom_access_token_hook 
    FROM authenticated, anon, public;

GRANT ALL 
    ON TABLE public.profiles 
    TO supabase_auth_admin;

CREATE POLICY "Allow auth admin to read user roles" ON public.profiles
    AS PERMISSIVE FOR SELECT
    TO supabase_auth_admin
    USING (true);