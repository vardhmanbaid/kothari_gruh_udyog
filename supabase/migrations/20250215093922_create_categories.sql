-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function for updating updated_at timestamp
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE PROCEDURE public.set_updated_at();

-- Enable RLS on the profiles table
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policies for categories
CREATE POLICY "Enable read access for all users" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON categories
    FOR INSERT WITH CHECK (is_active_admin());

CREATE POLICY "Enable update for authenticated users only" ON categories
    FOR UPDATE USING (is_active_admin());

CREATE POLICY "Enable delete for authenticated users only" ON categories
    FOR DELETE USING (is_active_admin());
