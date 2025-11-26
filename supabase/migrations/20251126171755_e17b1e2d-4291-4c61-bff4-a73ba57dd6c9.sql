-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create index for efficient role lookups
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Users can view their own roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Update security_logs RLS to allow admins to view all logs
CREATE POLICY "Admins can view all security logs"
  ON public.security_logs
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Create table for tracking suspicious IPs
CREATE TABLE public.suspicious_ips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT NOT NULL UNIQUE,
  reason TEXT NOT NULL,
  event_count INTEGER NOT NULL DEFAULT 1,
  first_seen TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_seen TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  blocked BOOLEAN NOT NULL DEFAULT false
);

-- Create index for IP lookups
CREATE INDEX idx_suspicious_ips_ip_address ON public.suspicious_ips(ip_address);
CREATE INDEX idx_suspicious_ips_blocked ON public.suspicious_ips(blocked);

-- Enable RLS (only admins can access)
ALTER TABLE public.suspicious_ips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage suspicious IPs"
  ON public.suspicious_ips
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));