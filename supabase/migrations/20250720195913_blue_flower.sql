/*
  # Create consultations table

  1. New Tables
    - `consultations`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `business_needs` (text, required)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `consultations` table
    - Add policy for authenticated users to read all consultations
    - Add policy for anyone to insert consultations (for public form submissions)
*/

CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  business_needs text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert consultations (for public form submissions)
CREATE POLICY "Anyone can submit consultations"
  ON consultations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all consultations
CREATE POLICY "Authenticated users can read consultations"
  ON consultations
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update consultations
CREATE POLICY "Authenticated users can update consultations"
  ON consultations
  FOR UPDATE
  TO authenticated
  USING (true);