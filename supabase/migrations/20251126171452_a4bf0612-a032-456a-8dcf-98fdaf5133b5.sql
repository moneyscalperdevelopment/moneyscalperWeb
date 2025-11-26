-- Create security_logs table for tracking OTP verification security events
CREATE TABLE public.security_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_details JSONB,
  phone_number TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for efficient querying
CREATE INDEX idx_security_logs_user_id ON public.security_logs(user_id);
CREATE INDEX idx_security_logs_phone_number ON public.security_logs(phone_number);
CREATE INDEX idx_security_logs_event_type ON public.security_logs(event_type);
CREATE INDEX idx_security_logs_created_at ON public.security_logs(created_at DESC);

-- Enable RLS
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

-- Users can view their own security logs
CREATE POLICY "Users can view their own security logs"
  ON public.security_logs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can insert security logs (edge functions use service role)
CREATE POLICY "Service role can insert security logs"
  ON public.security_logs
  FOR INSERT
  WITH CHECK (true);