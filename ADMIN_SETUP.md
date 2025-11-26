# Admin Security Dashboard Setup

## Overview

The admin dashboard provides comprehensive tools for managing users and monitoring security:

### Admin Security Dashboard
- **Security Logs**: View all OTP-related security events
- **Suspicious IPs**: Track and block IP addresses with suspicious patterns
- **Metrics**: Monitor verification success rates, failed attempts, and rate limits
- **IP-Based Rate Limiting**: Automatic blocking of IPs with excessive failed attempts
- **Automated Alerts**: Detection of suspicious patterns like multiple failed verification attempts
- **Downloadable Reports**: Export security data in PDF/CSV formats

### Admin User Management Dashboard
- **User Database**: View all registered users with complete details
- **Search & Filter**: Find users by email or phone number
- **Export Reports**: Download user data in PDF or CSV format
- **Email Integration**: Send user details via EmailJS
- **Verification Status**: Track email and SMS verification status
- **User Statistics**: View total users, verified counts, and more

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
3. Select "Security Dashboard" for security monitoring at `/admin/security`
4. Select "User Management" for user administration at `/admin/users`
5. Navigate between dashboards using the navigation buttons

## User Management Features

### 1. User Database Management

View and manage all registered users with:
- Email addresses
- Phone numbers
- Registration dates
- Email verification status
- SMS verification status

### 2. Search & Filter

- Search users by email or phone number
- Real-time filtering of results
- Display filtered count

### 3. Export User Reports

**PDF Export:**
- Professional formatted report
- User table with all details
- Verification status indicators
- Timestamped generation date

**CSV Export:**
- Spreadsheet-compatible format
- All user data included
- Easy import into Excel/Google Sheets

### 4. Email Integration via EmailJS

**Individual User Emails:**
- Click "Email" button on any user row
- Sends user details to admin email
- Uses existing EmailJS configuration

**Bulk Email:**
- "Email All" button sends details for all filtered users
- Useful for reporting and compliance
- Includes registration and verification info

### 5. User Statistics

Dashboard shows:
- Total registered users
- Email verified count
- SMS verified count  
- Unverified users count

## Security Features (OTP Monitoring)

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
