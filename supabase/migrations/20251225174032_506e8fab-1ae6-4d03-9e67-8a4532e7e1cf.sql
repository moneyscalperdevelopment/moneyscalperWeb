-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Anyone can submit lead" ON public.mock_test_leads;
DROP POLICY IF EXISTS "Anyone can update their lead" ON public.mock_test_leads;

-- Create PERMISSIVE policies (default behavior allows access)
CREATE POLICY "Anyone can submit lead" 
ON public.mock_test_leads 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can update their lead" 
ON public.mock_test_leads 
FOR UPDATE 
TO anon, authenticated
USING (true)
WITH CHECK (true);