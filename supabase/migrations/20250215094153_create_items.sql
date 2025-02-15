-- Create items table
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    base_uom TEXT NOT NULL,
    increment_by DECIMAL(10,2) NOT NULL,
    image_src TEXT,
    category_id INT REFERENCES categories(id),
    is_active BOOLEAN DEFAULT TRUE,
    is_out_of_stock BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create updated_at trigger
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON items
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

-- Enable RLS on the profiles table
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for everyone" ON items
    FOR SELECT 
    USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON items
    FOR INSERT 
    WITH CHECK (is_active_admin());

CREATE POLICY "Enable update access for authenticated users" ON items
    FOR UPDATE 
    USING (auth.role() = 'authenticated')
    WITH CHECK (is_active_admin());

CREATE POLICY "Enable delete access for authenticated users" ON items
    FOR DELETE 
    USING (is_active_admin());