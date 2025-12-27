-- Create leads table for mock test registrations
CREATE TABLE public.mock_test_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  test_completed BOOLEAN NOT NULL DEFAULT false,
  score INTEGER,
  total_questions INTEGER
);

-- Enable RLS
ALTER TABLE public.mock_test_leads ENABLE ROW LEVEL SECURITY;

-- Allow public insert (no auth required for lead capture)
CREATE POLICY "Anyone can submit lead" 
ON public.mock_test_leads 
FOR INSERT 
WITH CHECK (true);

-- Allow public update for completing test
CREATE POLICY "Anyone can update their lead" 
ON public.mock_test_leads 
FOR UPDATE 
USING (true);