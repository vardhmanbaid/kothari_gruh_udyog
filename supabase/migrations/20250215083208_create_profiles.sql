CREATE TABLE profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id),
    email_id text,
    role VARCHAR, -- Add role column
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION create_profile()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert into the profiles table
    INSERT INTO public.profiles 
    (
        user_id, 
        email_id, 
        role, 
        is_active, 
        created_at, 
        updated_at
    )
    VALUES 
    (
        NEW.id, 
        COALESCE(NEW.raw_user_meta_data->>'email', NEW.email),
        COALESCE(NEW.raw_user_meta_data->>'role', NEW.role), 
        TRUE, 
        NOW(), 
        NOW()
    );
    -- Return the newly inserted row to the trigger function
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE TRIGGER create_profile_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_profile();

-- Enable RLS on the profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- First, let's create a helper function to check if a user is an active admin
CREATE OR REPLACE FUNCTION is_active_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM profiles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Read policy - allows reading non-deleted profiles
CREATE POLICY active_profiles_read_policy ON profiles
    FOR SELECT
    USING (is_active);

-- Update policy - allows admins to update any profile, and users to update their own
CREATE POLICY profiles_update_policy ON profiles
    FOR UPDATE
    USING (
        (is_active_admin() OR user_id = auth.uid())
    );