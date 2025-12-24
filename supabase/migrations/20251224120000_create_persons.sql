-- PensaNIOS Schema

CREATE TABLE persons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  day INT NOT NULL CHECK (day >= 1 AND day <= 31),
  month INT NOT NULL CHECK (month >= 1 AND month <= 12),
  year INT NOT NULL CHECK (year >= 1900 AND year <= 2100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for birthday queries (month, day)
CREATE INDEX idx_persons_birthday ON persons (month, day);

-- Index for active persons
CREATE INDEX idx_persons_active ON persons (is_active) WHERE is_active = true;

-- Enable Row Level Security
ALTER TABLE persons ENABLE ROW LEVEL SECURITY;

-- Allow all operations for anon (no auth for now)
CREATE POLICY "Allow all for anon" ON persons
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);
