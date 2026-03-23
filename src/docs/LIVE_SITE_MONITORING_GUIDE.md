# 🔍 CREOVA Live Site Monitoring Guide

## Quick Health Check (2 Minutes)

### 1. Open Browser Console
Press `F12` or `Cmd+Option+I` (Mac) to open DevTools

### 2. Navigate to Critical Pages
Test these in order:

#### Page 1: Homepage `/`
```
✅ Should load without errors
✅ Navigation menu works
✅ All buttons clickable
✅ Images load correctly
```

#### Page 2: Auth Page `/auth` ⚠️ **CRITICAL**
```
✅ Form loads correctly
✅ No "VITE_SUPABASE_URL" error
✅ No "Multiple GoTrueClient" warning
✅ hCaptcha appears (no warning about "js api not loaded")
✅ Sign in/Sign up buttons work
✅ Social login buttons visible
```

**What to check in console:**
- ❌ NO errors about refs
- ❌ NO warnings about hCaptcha
- ❌ NO Supabase client warnings

#### Page 3: Booking Page `/booking` ⚠️ **CRITICAL**
```
✅ Form loads correctly
✅ Service dropdown works
✅ Date picker opens (click calendar icon)
✅ Calendar displays correctly (Button ref forwarding works)
✅ hCaptcha appears
✅ Submit button enabled after CAPTCHA
```

**What to check in console:**
- ❌ NO "Function components cannot be given refs" warning
- ❌ NO hCaptcha warnings
- ❌ NO Popover errors

#### Page 4: Memberships `/memberships` ⚠️ **CRITICAL**
```
✅ Membership cards display
✅ Creator ($299) card visible
✅ Legacy ($599) card visible
✅ Stripe buttons work
```

---

## Console Error Reference

### ✅ Expected (Normal Logs)
```
[Normal application logs]
Supabase client initialized
Navigation rendered
```

### ❌ Should NEVER Appear

#### Error 1: Environment Variable Issue
```
TypeError: Cannot read properties of undefined (reading 'VITE_SUPABASE_URL')
```
**If you see this**: AuthPage or AuthCallbackPage is not importing from `/utils/supabase/client`

#### Error 2: Ref Forwarding Issue
```
Warning: Function components cannot be given refs.
Check the render method of `SlotClone`.
```
**If you see this**: Button component is not using React.forwardRef()

#### Error 3: hCaptcha Loading Issue
```
[hCaptcha] should not render before js api is fully loaded.
```
**If you see this**: Captcha component is not using explicit rendering

#### Error 4: Multiple Supabase Clients
```
Multiple GoTrueClient instances detected
```
**If you see this**: Multiple Supabase clients being created instead of singleton

---

## Quick Test: Complete Auth Flow (3 Minutes)

### Test Sign Up
1. Go to `/auth`
2. Click "Sign Up" tab
3. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: TestPassword123!
   - Confirm Password: TestPassword123!
4. Check "I agree to Terms"
5. Complete CAPTCHA
6. Click "Create Account"

**Expected Result**:
```
✅ "Account created! Please check your email" toast appears
✅ Form switches to Login mode
✅ No console errors
```

### Test Login
1. Stay on `/auth`
2. Should be on "Login" tab
3. Fill in:
   - Email: (your real test account)
   - Password: (your real password)
4. Complete CAPTCHA
5. Click "Sign In"

**Expected Result**:
```
✅ "Welcome back!" toast appears
✅ Redirect to /memberships
✅ No console errors
```

### Test OAuth (Optional)
1. Go to `/auth`
2. Click "Continue with Google"
3. Redirects to Google
4. After approval, redirects to `/auth/callback`
5. Then redirects to `/memberships`

**Expected Result**:
```
✅ OAuth flow completes
✅ No "provider is not enabled" error
✅ No console errors
```

---

## Quick Test: Booking Flow (3 Minutes)

### Test Service Booking
1. Go to `/booking`
2. Select Service: "Family Portrait Photography"
3. Select Package: "Mini Memories - $450"
4. Click calendar icon
5. **CRITICAL**: Calendar should open (tests ref forwarding)
6. Select a future date
7. Fill in:
   - Name: Test Client
   - Email: client@example.com
   - Phone: (555) 123-4567
   - Preferred Time: 2:00 PM
   - Location: Toronto, ON
8. Complete CAPTCHA
9. Click "Submit Booking Request"

**Expected Result**:
```
✅ Calendar opens without errors
✅ Date selection works
✅ CAPTCHA appears correctly
✅ Form submits successfully
✅ Success toast appears
✅ No console errors
```

---

## Revenue Stream Testing (10 Minutes)

### 1. Test Membership Purchase
**Page**: `/memberships`

1. Click "Start Creator Journey" ($299)
2. Should redirect to Stripe checkout
3. ⚠️ **DO NOT COMPLETE** unless testing with test card

**Expected**:
```
✅ Stripe checkout loads
✅ Price shows $299 CAD
✅ No errors in console
```

### 2. Test Shop Purchase
**Page**: `/shop`

1. Click product (e.g., T-Shirt)
2. Select size
3. Click "Add to Cart"
4. Cart drawer opens
5. Click "Proceed to Checkout"
6. Fill shipping info

**Expected**:
```
✅ Cart updates correctly
✅ Checkout page loads
✅ Total calculates correctly
✅ No console errors
```

### 3. Test Event Ticket
**Page**: `/experience`

1. Scroll to events section
2. Click "Get Tickets" on an event
3. Should open ticket purchase flow

**Expected**:
```
✅ Ticket form loads
✅ Stripe integration ready
✅ No console errors
```

---

## Performance Check (2 Minutes)

### Chrome DevTools Performance
1. Open DevTools (F12)
2. Go to "Performance" tab
3. Navigate to homepage
4. Click "Record" → Refresh page → Stop recording

**Target Metrics**:
```
✅ First Contentful Paint: < 1.8s
✅ Time to Interactive: < 3.5s
✅ Cumulative Layout Shift: < 0.1
```

---

## Mobile Testing (5 Minutes)

### Chrome DevTools Device Emulation
1. Open DevTools (F12)
2. Click device icon (Ctrl+Shift+M)
3. Select "iPhone 12 Pro"
4. Test all critical pages

**Check**:
```
✅ Navigation menu works on mobile
✅ Forms are touch-friendly
✅ Buttons are large enough
✅ CAPTCHA renders correctly on mobile
✅ Calendar picker works on mobile
```

---

## Security Verification (3 Minutes)

### 1. Check CAPTCHA on Auth
```
✅ CAPTCHA required before form submission
✅ Cannot bypass CAPTCHA
✅ Form disabled until CAPTCHA completed
```

### 2. Check CAPTCHA on Booking
```
✅ CAPTCHA required before booking
✅ Cannot submit without CAPTCHA
✅ CAPTCHA resets after submission
```

### 3. Check Session Storage
1. Open DevTools
2. Go to "Application" tab
3. Click "Local Storage"
4. Look for key: `creova-auth-token`

**Expected**:
```
✅ Key exists after login
✅ Contains session data
✅ Persists across page reloads
```

---

## Troubleshooting

### Issue: CAPTCHA Not Loading
**Symptoms**: No CAPTCHA widget appears

**Check**:
1. Console for errors
2. Network tab for failed requests to hcaptcha.com
3. Ad blockers disabled
4. Site key is correct

**Fix**: Verify hCaptcha site key in `/components/Captcha.tsx`

### Issue: Calendar Won't Open
**Symptoms**: Clicking calendar icon does nothing

**Check**:
1. Console for ref errors
2. Verify Button component has forwardRef
3. Check Popover imports

**Fix**: Ensure Button uses React.forwardRef()

### Issue: Auth Not Working
**Symptoms**: Cannot sign in/up

**Check**:
1. Console for Supabase errors
2. Network tab for failed API calls
3. Verify Supabase URL and keys

**Fix**: Check `/utils/supabase/info.tsx` has correct values

### Issue: Multiple Client Warning
**Symptoms**: Warning about multiple GoTrueClient instances

**Check**:
1. AuthPage imports from `/utils/supabase/client`
2. AuthCallbackPage imports from `/utils/supabase/client`
3. No other files creating Supabase clients

**Fix**: Use singleton client everywhere

---

## Emergency Rollback Procedure

### If Critical Errors Appear:

1. **Immediate**: Take note of error messages
2. **Check**: Which page/component is affected
3. **Verify**: Is it affecting revenue streams?
4. **Document**: Screenshot errors and console logs

### Files to Check First:
```
/components/ui/button.tsx
/components/Captcha.tsx
/utils/supabase/client.tsx
/pages/AuthPage.tsx
/pages/BookingPage.tsx
```

### Emergency Contacts:
- Development team
- Supabase support (if auth issues)
- Stripe support (if payment issues)
- hCaptcha support (if CAPTCHA issues)

---

## Daily Monitoring Checklist

### Morning Check (Every Day)
- [ ] Test homepage loads
- [ ] Test auth page works
- [ ] Test booking page works
- [ ] Check console for errors
- [ ] Verify CAPTCHA loading

### Weekly Deep Check (Every Monday)
- [ ] Test complete auth flow
- [ ] Test complete booking flow
- [ ] Test membership purchase (with test card)
- [ ] Test shop checkout
- [ ] Test all OAuth providers
- [ ] Review error logs
- [ ] Check performance metrics

### Monthly Review (First of Month)
- [ ] Review all revenue streams
- [ ] Analyze conversion rates
- [ ] Check for security updates
- [ ] Update dependencies if needed
- [ ] Review and update documentation

---

## Key Metrics to Track

### User Engagement
- Daily active users
- New registrations
- Login success rate

### Revenue
- Booking submissions
- Membership purchases
- Shop sales
- Event ticket sales

### Technical Health
- Page load times
- Error rates
- API response times
- CAPTCHA success rate

### Security
- Failed login attempts
- CAPTCHA failure rate
- Suspicious activity

---

## Success Indicators

### ✅ Everything Working Correctly
```
- Clean console (no errors)
- All forms submitting
- CAPTCHA loading every time
- Auth working seamlessly
- Bookings going through
- Payments processing
- Fast page loads
- Mobile responsive
```

### 🚨 Something Wrong
```
- Console errors present
- Forms not submitting
- CAPTCHA not appearing
- Auth failing
- Bookings failing
- Payments broken
- Slow page loads
- Mobile issues
```

---

## Quick Reference: Critical URLs

```
Production Site: [Your domain]
Auth Page:       [Your domain]/auth
Booking Page:    [Your domain]/booking
Memberships:     [Your domain]/memberships
Shop:            [Your domain]/shop
Events:          [Your domain]/experience

Supabase Dashboard: https://supabase.com/dashboard
Stripe Dashboard:   https://dashboard.stripe.com
hCaptcha Dashboard: https://dashboard.hcaptcha.com
```

---

**Last Updated**: November 18, 2024  
**Status**: All systems operational ✅  
**Next Review**: [Date]

---

## Contact for Issues

- **Technical Issues**: [Your email]
- **Payment Issues**: [Stripe support email]
- **Auth Issues**: [Supabase support]
- **Emergency**: [Emergency contact]

---

**Remember**: Monitor the first 24 hours closely. Most issues appear within the first day of deployment.
