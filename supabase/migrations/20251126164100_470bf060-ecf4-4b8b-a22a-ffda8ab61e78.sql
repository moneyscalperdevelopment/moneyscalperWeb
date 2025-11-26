-- Create table for storing SMS OTP codes
CREATE TABLE public.sms_otp_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  phone_number TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '10 minutes'),
  verified BOOLEAN NOT NULL DEFAULT false,
  attempts INTEGER NOT NULL DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE public.sms_otp_codes ENABLE ROW LEVEL SECURITY;

-- Create policies for sms_otp_codes
CREATE POLICY "Users can view their own OTP codes" 
ON public.sms_otp_codes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own OTP codes" 
ON public.sms_otp_codes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own OTP codes" 
ON public.sms_otp_codes 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Add phone_number and sms_verified columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS sms_verified BOOLEAN NOT NULL DEFAULT false;

-- Create index for faster OTP lookups
CREATE INDEX idx_sms_otp_user_phone ON public.sms_otp_codes(user_id, phone_number);
CREATE INDEX idx_sms_otp_expires ON public.sms_otp_codes(expires_at);

-- Function to clean up expired OTP codes
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.sms_otp_codes 
  WHERE expires_at < now() 
  AND verified = false;
END;
$$;