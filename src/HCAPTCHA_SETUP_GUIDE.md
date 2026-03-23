# hCaptcha Production Setup Guide

## Current Status
✅ hCaptcha is already integrated into your CREOVA website  
⚠️ Currently using **test key** - needs production key for live use

---

## Why hCaptcha?
- ✅ **Privacy-focused** - GDPR compliant
- ✅ **Free tier** - Perfect for startups
- ✅ **No Google tracking** - Independent solution
- ✅ **User-friendly** - Good UX for visitors
- ✅ **Already implemented** - No code changes needed

---

## Where hCaptcha is Used

Your website uses hCaptcha in these critical areas:

1. **Contact Forms** (`/pages/ContactPage.tsx`)
2. **Booking System** (`/pages/BookingPage.tsx`)
3. **Newsletter Signups** (various pages)
4. **User Authentication** (`/pages/SignupPage.tsx`, `/pages/LoginPage.tsx`)

---

## Getting Your Production Key

### Step 1: Create hCaptcha Account
1. Go to **https://www.hcaptcha.com/**
2. Click **"Sign Up"** in the top right
3. Create account with your CREOVA email
4. Verify your email address

### Step 2: Add Your Website
1. Log into hCaptcha dashboard: **https://dashboard.hcaptcha.com/**
2. Click **"New Site"** or **"+ Add Site"**
3. Fill in the details:
   - **Site Name:** CREOVA Website
   - **Hostnames:** Add your domains:
     - `creova.ca` (or your actual domain)
     - `www.creova.ca`
     - `localhost` (for local testing)
   - **Passing Threshold:** Leave as default (recommended)
   - **Privacy Settings:** Enable as needed

4. Click **"Save"**

### Step 3: Get Your Site Key
1. After creating the site, you'll see your **Site Key** (also called "Sitekey")
2. Copy this key - it looks like: `10000000-ffff-ffff-ffff-000000000001`
3. **Important:** Also note your **Secret Key** (needed for server-side verification)

---

## Adding the Key to Your Project

### Option 1: Environment Variable (Recommended for Production)

1. In your project root, create or update `.env` file:

```env
# hCaptcha Production Key
VITE_HCAPTCHA_SITE_KEY=your_actual_site_key_here
```

2. Replace `your_actual_site_key_here` with your actual site key from hCaptcha dashboard

3. Restart your development server

### Option 2: Direct Replacement (Quick Testing)

If you want to quickly test, you can directly replace the test key in `/components/Captcha.tsx`:

```tsx
// Change this line:
siteKey = import.meta.env.VITE_HCAPTCHA_SITE_KEY || '10000000-ffff-ffff-ffff-000000000001'

// To this:
siteKey = 'your_actual_site_key_here'
```

**⚠️ Not recommended for production** - use environment variables instead

---

## Server-Side Verification (Already Implemented)

Your backend already has hCaptcha verification set up in `/supabase/functions/server/index.tsx`.

**You'll also need to add the Secret Key:**

1. In Supabase Dashboard:
   - Go to **Project Settings** > **Edge Functions**
   - Add environment variable: `HCAPTCHA_SECRET_KEY`
   - Value: Your secret key from hCaptcha dashboard

2. Or add to your `.env` file:
```env
HCAPTCHA_SECRET_KEY=your_secret_key_here
```

---

## Testing Your Setup

### 1. Test Key (Current)
- **Site Key:** `10000000-ffff-ffff-ffff-000000000001`
- **Behavior:** Always passes (for development only)
- **Status:** ⚠️ Not for production use

### 2. Production Key (After Setup)
1. Visit your contact form or booking page
2. You should see the hCaptcha challenge
3. Complete the challenge
4. Form should submit successfully
5. Check browser console for any errors

---

## Troubleshooting

### "Invalid site key" error
- ✅ Verify the site key is copied correctly
- ✅ Check that your domain is added to hCaptcha dashboard
- ✅ Make sure there are no extra spaces in the key

### hCaptcha not appearing
- ✅ Check browser console for errors
- ✅ Verify internet connection (hCaptcha loads from CDN)
- ✅ Check if ad blockers are interfering
- ✅ Ensure JavaScript is enabled

### "Verification failed" on backend
- ✅ Verify secret key is set correctly in Supabase
- ✅ Check server logs in Supabase Functions
- ✅ Ensure backend is making correct verification request

---

## Production Checklist

Before going live, ensure:

- [ ] Created hCaptcha account
- [ ] Added production domain to hCaptcha dashboard
- [ ] Set `VITE_HCAPTCHA_SITE_KEY` environment variable
- [ ] Set `HCAPTCHA_SECRET_KEY` in Supabase Edge Functions
- [ ] Tested on staging environment
- [ ] Verified forms submit successfully
- [ ] Checked backend verification works
- [ ] Removed test key from code

---

## Cost & Limits

### Free Tier (Recommended for CREOVA)
- ✅ **Unlimited requests** for most use cases
- ✅ **Free forever** for low/medium traffic
- ✅ **No credit card required**

### Enterprise (If Needed)
- For very high traffic (millions of requests)
- Custom features and SLA
- Contact hCaptcha for pricing

---

## Alternative: Cloudflare Turnstile

If you prefer a different solution, **Cloudflare Turnstile** is another excellent option:

### Pros:
- ✅ Completely free
- ✅ Invisible/minimal user friction
- ✅ Privacy-focused
- ✅ Easy setup

### To Switch:
Let me know and I can rewrite the Captcha component to use Turnstile instead.

---

## Support

### hCaptcha Support:
- Documentation: https://docs.hcaptcha.com/
- Support: https://www.hcaptcha.com/support
- Community: https://community.hcaptcha.com/

### Need Help?
If you encounter any issues setting this up, I can:
1. Help troubleshoot errors
2. Switch to a different CAPTCHA provider
3. Adjust the implementation

---

## Summary

**Current State:**  
✅ hCaptcha is integrated and working with test key

**Next Steps:**  
1. Sign up at https://www.hcaptcha.com/
2. Create a site and get your production key
3. Add `VITE_HCAPTCHA_SITE_KEY` to your environment
4. Add `HCAPTCHA_SECRET_KEY` to Supabase Edge Functions
5. Test and deploy!

**Time Required:** ~10 minutes

---

**Last Updated:** November 18, 2025  
**Status:** Ready for Production Setup
