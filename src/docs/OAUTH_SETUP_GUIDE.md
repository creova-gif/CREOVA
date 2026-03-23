# OAuth Provider Setup Guide for CREOVA

This guide walks you through setting up social login (OAuth) providers for CREOVA's authentication system.

## Overview

CREOVA supports the following OAuth providers:
- ✅ Google Sign-In
- ✅ Facebook Login
- ✅ GitHub OAuth
- ✅ Apple Sign-In

All OAuth providers are configured through the Supabase Dashboard and require NO code changes - the implementation is already complete!

---

## Prerequisites

Before setting up OAuth providers, ensure you have:
- [ ] Access to Supabase Dashboard for your project
- [ ] Admin access to create OAuth apps on provider platforms
- [ ] Your CREOVA website URL (production domain)

---

## 1. Google Sign-In Setup

### Step 1: Create Google OAuth App

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth 2.0 Client ID**
5. Configure OAuth consent screen:
   - App name: **CREOVA**
   - User support email: **support@creova.ca**
   - Logo: Upload CREOVA logo (120x120px recommended)
   - App domain: **https://your-domain.com**
   - Authorized domains: Add your domain
   - Developer contact: **support@creova.ca**

6. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: **CREOVA Web**
   - Authorized redirect URIs:
     ```
     https://<your-supabase-project>.supabase.co/auth/v1/callback
     ```

7. Save the **Client ID** and **Client Secret**

### Step 2: Configure in Supabase

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your CREOVA project
3. Navigate to **Authentication** > **Providers**
4. Find **Google** and click **Enable**
5. Enter:
   - **Client ID**: Paste from Google Cloud Console
   - **Client Secret**: Paste from Google Cloud Console
6. Click **Save**

### Step 3: Test

1. Visit https://your-domain.com/auth
2. Click "Continue with Google"
3. Complete sign-in flow
4. Verify redirect back to your app

**Troubleshooting**:
- If redirect fails, verify the redirect URI exactly matches
- Ensure OAuth consent screen is published (not in "Testing" mode for production)
- Check that authorized domains are correct

---

## 2. Facebook Login Setup

### Step 1: Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** > **Create App**
3. Select **Consumer** or **Business** (choose Consumer for most cases)
4. App Display Name: **CREOVA**
5. App Contact Email: **support@creova.ca**
6. Click **Create App**

### Step 2: Add Facebook Login Product

1. In your app dashboard, click **Add Product**
2. Find **Facebook Login** and click **Set Up**
3. Choose **Web** as platform
4. Enter your site URL: **https://your-domain.com**
5. In Facebook Login Settings:
   - Valid OAuth Redirect URIs:
     ```
     https://<your-supabase-project>.supabase.co/auth/v1/callback
     ```
   - Allowed Domains: **your-domain.com**

### Step 3: Get App Credentials

1. Go to **Settings** > **Basic**
2. Copy:
   - **App ID**
   - **App Secret** (click "Show")

### Step 4: Configure in Supabase

1. Supabase Dashboard > **Authentication** > **Providers**
2. Find **Facebook** and click **Enable**
3. Enter:
   - **Client ID**: Paste App ID from Facebook
   - **Client Secret**: Paste App Secret from Facebook
4. Click **Save**

### Step 5: Submit for Review (Production)

For production use, you need to submit for Facebook App Review:
1. Complete App Review submission
2. Request permissions: `email`, `public_profile`
3. Provide testing credentials
4. Usually takes 1-3 business days

**Testing Mode**: You can test with your own Facebook account before review approval.

---

## 3. GitHub OAuth Setup

### Step 1: Create GitHub OAuth App

1. Go to [GitHub Settings](https://github.com/settings/developers)
2. Click **OAuth Apps** > **New OAuth App**
3. Fill in:
   - **Application name**: CREOVA
   - **Homepage URL**: https://your-domain.com
   - **Authorization callback URL**:
     ```
     https://<your-supabase-project>.supabase.co/auth/v1/callback
     ```
   - **Application description**: CREOVA creative agency authentication
4. Click **Register application**

### Step 2: Get Credentials

1. Copy the **Client ID**
2. Click **Generate a new client secret**
3. Copy the **Client Secret** (you won't be able to see it again!)

### Step 3: Configure in Supabase

1. Supabase Dashboard > **Authentication** > **Providers**
2. Find **GitHub** and click **Enable**
3. Enter:
   - **Client ID**: Paste from GitHub
   - **Client Secret**: Paste from GitHub
4. Click **Save**

**Note**: GitHub OAuth is the simplest to set up - no app review required!

---

## 4. Apple Sign-In Setup

### Step 1: Apple Developer Account

1. You need an **Apple Developer Account** ($99/year)
2. Go to [Apple Developer Portal](https://developer.apple.com/)

### Step 2: Create Services ID

1. Go to **Certificates, Identifiers & Profiles**
2. Click **Identifiers** > **+** (Plus button)
3. Select **Services IDs** > **Continue**
4. Description: **CREOVA**
5. Identifier: **com.creova.auth** (reverse domain format)
6. Click **Continue** > **Register**

### Step 3: Configure Service ID

1. Find your newly created Services ID
2. Check **Sign In with Apple**
3. Click **Configure**
4. Primary App ID: Select or create an App ID
5. Domain: **your-domain.com**
6. Return URLs:
   ```
   https://<your-supabase-project>.supabase.co/auth/v1/callback
   ```
7. Save configuration

### Step 4: Create Private Key

1. Go to **Keys** > **+** (Plus button)
2. Key Name: **CREOVA Sign In**
3. Enable **Sign In with Apple**
4. Click **Configure** > Select your Services ID
5. Click **Continue** > **Register**
6. **Download the .p8 key file** (only shown once!)
7. Note the **Key ID**

### Step 5: Get Team ID

1. In Apple Developer Portal, top right corner
2. Copy your **Team ID** (10-character string)

### Step 6: Configure in Supabase

1. Supabase Dashboard > **Authentication** > **Providers**
2. Find **Apple** and click **Enable**
3. Enter:
   - **Services ID**: Your Services ID (e.g., com.creova.auth)
   - **Team ID**: Your Apple Team ID
   - **Key ID**: From the private key you created
   - **Private Key**: Paste contents of .p8 file
4. Click **Save**

**Note**: Apple Sign-In is the most complex to set up but provides best security.

---

## 5. Testing OAuth Providers

### Test Checklist

For each provider you've enabled:

- [ ] Visit https://your-domain.com/auth
- [ ] Click the provider button (e.g., "Continue with Google")
- [ ] Complete sign-in on provider's page
- [ ] Verify redirect back to CREOVA
- [ ] Check user is logged in
- [ ] Verify user data is stored (name, email)
- [ ] Test logout functionality
- [ ] Test login again with same account

### Common Issues & Solutions

**Error: "redirect_uri_mismatch"**
- Solution: Double-check the callback URL exactly matches in both provider dashboard and Supabase

**Error: "invalid_client"**
- Solution: Verify Client ID and Secret are correct, no extra spaces

**Error: "access_denied"**
- Solution: User cancelled login, or app not approved (Facebook)

**Error: "unauthorized_client"**
- Solution: OAuth app not published/approved yet

**User data missing (name/email)**
- Solution: Request appropriate scopes in provider settings

---

## 6. Production Checklist

Before going live with OAuth:

### Google
- [ ] OAuth consent screen published (not "Testing" mode)
- [ ] Privacy Policy URL added to consent screen
- [ ] Terms of Service URL added to consent screen
- [ ] Logo uploaded (120x120px)
- [ ] App verified (if requesting sensitive scopes)

### Facebook
- [ ] App Review completed and approved
- [ ] App Mode set to "Live" (not Development)
- [ ] Privacy Policy URL configured
- [ ] App Icon uploaded (1024x1024px)
- [ ] Data Deletion Callback URL configured

### GitHub
- [ ] Application logo uploaded (recommended)
- [ ] Organization verified (if using org account)

### Apple
- [ ] Domain verification completed
- [ ] Privacy Policy URL configured
- [ ] Terms of Service URL configured

### All Providers
- [ ] Tested on multiple devices
- [ ] Tested on mobile browsers
- [ ] Error handling works correctly
- [ ] User data syncs to CREOVA database
- [ ] Email notifications working (if applicable)
- [ ] Analytics tracking OAuth signups

---

## 7. Security Best Practices

### Secure Your OAuth Apps

1. **Never commit secrets to code**
   - All secrets in Supabase Dashboard only
   - Use environment variables for any config

2. **Rotate credentials regularly**
   - Quarterly rotation recommended
   - Update both provider dashboard and Supabase

3. **Monitor for suspicious activity**
   - Check Supabase Auth logs regularly
   - Set up alerts for unusual patterns

4. **Keep apps updated**
   - Review provider dashboards quarterly
   - Update callback URLs if domain changes

### User Privacy

1. **Request minimal permissions**
   - Only request email and basic profile
   - Don't request unnecessary scopes

2. **Inform users**
   - Privacy Policy explains OAuth usage
   - Users can disconnect OAuth in settings

3. **Handle account merging**
   - If user signs up with email, then OAuth
   - Link accounts by email match

---

## 8. Debugging OAuth Issues

### Enable Debug Mode in Supabase

1. Supabase Dashboard > **Authentication** > **Settings**
2. Enable **Debug Mode** temporarily
3. Check detailed logs in Supabase Logs tab

### Check Browser Console

1. Open DevTools (F12)
2. Go to Console tab
3. Look for auth errors during OAuth flow

### Test with cURL

```bash
# Test Google OAuth (after getting auth code)
curl -X POST 'https://<your-supabase-project>.supabase.co/auth/v1/token?grant_type=authorization_code' \
  -H "Content-Type: application/json" \
  -d '{
    "code": "AUTH_CODE_FROM_GOOGLE",
    "code_verifier": "CODE_VERIFIER",
    "redirect_uri": "YOUR_REDIRECT_URI"
  }'
```

### Common Debug Steps

1. **Check Supabase Logs**:
   - Dashboard > Edge Functions > Logs
   - Look for auth-related errors

2. **Verify Redirect URI**:
   - Must match exactly (including https://)
   - No trailing slashes unless in provider config

3. **Check Browser Network Tab**:
   - See exact error from provider
   - Verify callback is receiving data

4. **Test in Incognito Mode**:
   - Rules out cache/cookie issues
   - Fresh auth flow

---

## 9. User Migration

### Migrating Existing Users to OAuth

If you have existing email/password users who want to use OAuth:

1. **Account Linking** (Automatic):
   - Supabase automatically links if emails match
   - User can sign in with either method

2. **Force OAuth** (Optional):
   - Disable email/password auth
   - Users must use OAuth going forward
   - Send notification email first!

3. **Hybrid Approach** (Recommended):
   - Allow both email and OAuth
   - Let users choose preferred method
   - Show connected accounts in profile

---

## 10. Cost Considerations

### Free Tiers

- **Google**: Free (unlimited users)
- **Facebook**: Free (unlimited users)
- **GitHub**: Free (unlimited users)
- **Apple**: $99/year Developer Program required

### Rate Limits

Most providers have generous rate limits for authentication:
- Google: 10,000 requests/day (can request increase)
- Facebook: No published limit for auth
- GitHub: 5,000 OAuth API calls/hour
- Apple: No published limit

**For CREOVA's expected usage**: All free tiers are sufficient.

---

## 11. Support & Resources

### Provider Documentation

- **Google**: https://developers.google.com/identity/protocols/oauth2
- **Facebook**: https://developers.facebook.com/docs/facebook-login
- **GitHub**: https://docs.github.com/en/developers/apps/oauth-apps
- **Apple**: https://developer.apple.com/sign-in-with-apple/

### Supabase Documentation

- **Auth Providers**: https://supabase.com/docs/guides/auth/social-login
- **Google Setup**: https://supabase.com/docs/guides/auth/social-login/auth-google
- **Facebook Setup**: https://supabase.com/docs/guides/auth/social-login/auth-facebook
- **GitHub Setup**: https://supabase.com/docs/guides/auth/social-login/auth-github
- **Apple Setup**: https://supabase.com/docs/guides/auth/social-login/auth-apple

### Getting Help

- **Supabase Discord**: https://discord.supabase.com/
- **CREOVA Support**: support@creova.ca
- **Provider Support**: Use provider's developer forums

---

## 12. Quick Setup Priority

**Recommended Setup Order** (easiest to hardest):

1. ✅ **GitHub** (5 minutes)
   - Easiest setup
   - No app review
   - Great for developers

2. ✅ **Google** (15 minutes)
   - Most popular
   - Easy for general users
   - No app review for basic auth

3. ✅ **Facebook** (30 minutes + review time)
   - Popular with consumers
   - Requires app review
   - 1-3 days review time

4. ✅ **Apple** (45 minutes + $99/year)
   - Required for iOS apps
   - Best security
   - Most complex setup

**For MVP Launch**: Set up Google and GitHub first. Add Facebook and Apple later.

---

**Document Version**: 1.0.0  
**Last Updated**: November 18, 2024  
**Maintained By**: CREOVA Development Team
