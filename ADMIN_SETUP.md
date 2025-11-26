# Admin Security Dashboard Setup

## Overview

The admin security dashboard provides comprehensive monitoring and management of OTP verification security, including:

- **Security Logs**: View all OTP-related security events
- **Suspicious IPs**: Track and block IP addresses with suspicious patterns
- **Metrics**: Monitor verification success rates, failed attempts, and rate limits
- **IP-Based Rate Limiting**: Automatic blocking of IPs with excessive failed attempts
- **Automated Alerts**: Detection of suspicious patterns like multiple failed verification attempts

## Granting Admin Access

To grant a user admin access to the security dashboard:

1. **Get the user's ID** from the authentication system
2. **Run this SQL query** in your backend:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('USER_ID_HERE', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

Replace `USER_ID_HERE` with the actual user ID from the `auth.users` table.

### Example: Making yourself an admin

If you want to make your own account an admin:

1. Sign up or log in to your account
2. Find your user ID in the backend's `auth.users` table
3. Run the SQL query above with your user ID

## Accessing the Dashboard

Once admin role is granted:

1. Log in to your account
2. Click on your profile icon in the header
3. Select "Security Dashboard" from the dropdown menu
4. You'll see the full security monitoring interface at `/admin/security`

## Security Features

### 1. IP-Based Rate Limiting

- Blocks IPs with 10+ failed attempts in 1 hour
- Automatically tracks suspicious IPs
- Manual block/unblock capability for admins

### 2. Automated Pattern Detection

- Flags IPs with multiple failed OTP attempts
- Logs all suspicious activities
- Tracks rate limit violations

### 3. Security Logging

All OTP verification events are logged with:
- Event type (generated, verified, failed, etc.)
- IP address and user agent
- Timestamp and detailed context
- User and phone number information

### 4. Suspicious IP Management

Admins can:
- View all flagged IPs
- See event counts and patterns
- Block/unblock specific IPs
- Review reasons for flagging

## Security Event Types

| Event Type | Description |
|-----------|-------------|
| `otp_generated` | New OTP code generated and sent |
| `successful_verification` | OTP successfully verified |
| `failed_verification_attempt` | Incorrect OTP code provided |
| `rate_limit_exceeded` | User exceeded 60-second rate limit |
| `daily_limit_exceeded` | User reached daily OTP limit (5/day) |
| `expired_otp_attempt` | Attempted to verify expired OTP |
| `suspicious_ip_activity` | IP flagged for excessive failures |
| `ip_blocked` | Blocked IP attempted access |

## Best Practices

1. **Regular Monitoring**: Check the dashboard daily for suspicious patterns
2. **Quick Response**: Block IPs showing clear abuse patterns
3. **Review Blocks**: Periodically review and unblock false positives
4. **User Communication**: Inform legitimate users if their IP is blocked
5. **Escalation**: Report serious security threats to your security team

## Troubleshooting

### User can't access dashboard
- Verify the user has the 'admin' role in `user_roles` table
- Check RLS policies are correctly applied
- Ensure user is logged in

### No security logs showing
- Check that OTP verification is being used
- Verify edge function is deployed
- Check browser console for errors

### IP blocking not working
- Verify `suspicious_ips` table exists
- Check RLS policies allow admin access
- Review edge function logs for errors
