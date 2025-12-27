-- Ensure mock test lead capture works for public users by using PERMISSIVE policies
DROP POLICY IF EXISTS "Anyone can submit lead" ON public.mock_test_leads;
DROP POLICY IF EXISTS "Anyone can update their lead" ON public.mock_test_leads;

-- Explicitly create PERMISSIVE policies (required if previous policies were RESTRICTIVE)
CREATE POLICY "Anyone can submit lead"
ON public.mock_test_leads
AS PERMISSIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can update their lead"
ON public.mock_test_leads
AS PERMISSIVE
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);
