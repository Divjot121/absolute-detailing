-- ============================================================================
-- Absolute Car Wash & Detailing — Supabase Schema & Migration
-- ============================================================================
-- This migration ensures the `bookings` table has the required fields,
-- including `pet_hair_removal`, proper status enums, indexes, and RLS policies.
-- ============================================================================

-- 1. Create table if not already existing
CREATE TABLE IF NOT EXISTS public.bookings (
  booking_id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  vehicle_make_model TEXT,
  package TEXT NOT NULL,
  preferred_date TEXT NOT NULL,
  preferred_time TEXT NOT NULL,
  service_address TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'confirmed', 'completed', 'cancelled')),
  total_price NUMERIC
);

-- 2. Add missing `pet_hair_removal` column (identified in source-of-truth audit)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'bookings' 
      AND column_name = 'pet_hair_removal'
  ) THEN
    ALTER TABLE public.bookings ADD COLUMN pet_hair_removal BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

-- 3. Add `total_price` column if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'bookings' 
      AND column_name = 'total_price'
  ) THEN
    ALTER TABLE public.bookings ADD COLUMN total_price NUMERIC;
  END IF;
END $$;

-- 4. Create indexes for operational speed
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings (status);
CREATE INDEX IF NOT EXISTS idx_bookings_phone ON public.bookings (phone);

-- 5. Set up Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous public submission of booking requests (Insert only)
CREATE POLICY "Allow public booking request insert" 
  ON public.bookings 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Restrict read/update access to authenticated business managers
CREATE POLICY "Allow authenticated staff to read bookings" 
  ON public.bookings 
  FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated staff to update booking status" 
  ON public.bookings 
  FOR UPDATE 
  TO authenticated 
  USING (true);
