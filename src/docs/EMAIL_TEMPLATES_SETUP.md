# 📧 EMAIL TEMPLATES SETUP GUIDE - CREOVA

## Supabase Email Configuration

### **Step 1: Access Supabase Email Settings**

1. Go to: https://supabase.com/dashboard
2. Select your CREOVA project
3. Navigate to **Authentication** → **Email Templates**

---

## **📋 EMAIL TEMPLATES TO CONFIGURE**

### **1. WELCOME EMAIL (Sign Up Confirmation)**

**Template Name:** Confirm Signup  
**Subject:** Welcome to CREOVA - Verify Your Email ✨

**HTML Template:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #F5F1EB;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #FFFFFF;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .header {
      background-color: #121212;
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      color: #F5F1EB;
      margin: 0;
      font-size: 32px;
      font-weight: 300;
      letter-spacing: 2px;
    }
    .content {
      padding: 40px 30px;
      color: #121212;
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      background-color: #121212;
      color: #F5F1EB;
      padding: 16px 40px;
      text-decoration: none;
      border-radius: 8px;
      margin: 20px 0;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
    .footer {
      background-color: #E3DCD3;
      padding: 30px;
      text-align: center;
      color: #7A6F66;
      font-size: 14px;
    }
    .accent {
      color: #A68F59;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>CREOVA</h1>
      <p style="color: #A68F59; margin: 10px 0 0 0; font-size: 14px; letter-spacing: 1px;">CREATIVE STORIES, DIGITAL IMPACT</p>
    </div>
    
    <div class="content">
      <h2 style="color: #121212; margin-top: 0;">Welcome to CREOVA! 🎉</h2>
      
      <p>Hi <strong>{{ .Name }}</strong>,</p>
      
      <p>We're thrilled to have you join the CREOVA community! As a Black-led creative agency, we're passionate about authentic storytelling and visual excellence.</p>
      
      <p>To get started, please verify your email address by clicking the button below:</p>
      
      <div style="text-align: center;">
        <a href="{{ .ConfirmationURL }}" class="button">Verify Email Address</a>
      </div>
      
      <p style="margin-top: 30px;">Once verified, you'll have access to:</p>
      <ul style="color: #121212;">
        <li>🎥 Professional videography & photography services</li>
        <li>👕 SEEN fashion collection</li>
        <li>📦 Digital products & presets</li>
        <li>🎟️ Exclusive events & workshops</li>
        <li>🤝 Collaboration opportunities</li>
      </ul>
      
      <p>Questions? Reply to this email or visit our <a href="https://creova.ca/contact" style="color: #A68F59;">contact page</a>.</p>
      
      <p style="margin-top: 30px;">
        <strong style="color: #121212;">Welcome to the family,</strong><br>
        <span class="accent">The CREOVA Team</span>
      </p>
    </div>
    
    <div class="footer">
      <p><strong>CREOVA Creative Studio</strong><br>
      Ontario, Canada<br>
      <a href="https://creova.ca" style="color: #A68F59; text-decoration: none;">creova.ca</a></p>
      
      <p style="margin-top: 20px; font-size: 12px;">
        This email was sent to {{ .Email }}. If you didn't create a CREOVA account, you can safely ignore this email.
      </p>
    </div>
  </div>
</body>
</html>
```

---

### **2. PASSWORD RESET EMAIL**

**Subject:** Reset Your CREOVA Password 🔒

**HTML Template:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #F5F1EB;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #FFFFFF;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .header {
      background-color: #121212;
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      color: #F5F1EB;
      margin: 0;
      font-size: 32px;
      font-weight: 300;
      letter-spacing: 2px;
    }
    .content {
      padding: 40px 30px;
      color: #121212;
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      background-color: #B1643B;
      color: #FFFFFF;
      padding: 16px 40px;
      text-decoration: none;
      border-radius: 8px;
      margin: 20px 0;
      font-weight: 500;
    }
    .alert {
      background-color: #FFF3E0;
      border-left: 4px solid #B1643B;
      padding: 15px;
      margin: 20px 0;
    }
    .footer {
      background-color: #E3DCD3;
      padding: 30px;
      text-align: center;
      color: #7A6F66;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>CREOVA</h1>
    </div>
    
    <div class="content">
      <h2 style="color: #121212; margin-top: 0;">Password Reset Request 🔒</h2>
      
      <p>Hi there,</p>
      
      <p>We received a request to reset the password for your CREOVA account associated with <strong>{{ .Email }}</strong>.</p>
      
      <p>Click the button below to create a new password:</p>
      
      <div style="text-align: center;">
        <a href="{{ .ConfirmationURL }}" class="button">Reset Password</a>
      </div>
      
      <div class="alert">
        <strong>⏰ This link expires in 1 hour</strong><br>
        For security reasons, this password reset link is only valid for 60 minutes.
      </div>
      
      <p><strong>Didn't request a password reset?</strong><br>
      If you didn't make this request, you can safely ignore this email. Your password will remain unchanged.</p>
      
      <p style="margin-top: 30px;">
        <strong>Stay secure,</strong><br>
        <span style="color: #A68F59;">The CREOVA Team</span>
      </p>
    </div>
    
    <div class="footer">
      <p><strong>CREOVA Creative Studio</strong><br>
      Ontario, Canada<br>
      <a href="https://creova.ca" style="color: #A68F59; text-decoration: none;">creova.ca</a></p>
    </div>
  </div>
</body>
</html>
```

---

### **3. BOOKING CONFIRMATION EMAIL**

**Subject:** Your CREOVA Booking is Confirmed! 📸

**HTML Template:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #F5F1EB;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #FFFFFF;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #121212 0%, #2D2D2D 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      color: #F5F1EB;
      margin: 0;
      font-size: 32px;
      font-weight: 300;
      letter-spacing: 2px;
    }
    .content {
      padding: 40px 30px;
      color: #121212;
      line-height: 1.6;
    }
    .booking-details {
      background-color: #F5F1EB;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #E3DCD3;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .footer {
      background-color: #E3DCD3;
      padding: 30px;
      text-align: center;
      color: #7A6F66;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>CREOVA</h1>
      <p style="color: #A68F59; margin: 10px 0 0 0;">Booking Confirmed ✓</p>
    </div>
    
    <div class="content">
      <h2 style="color: #121212; margin-top: 0;">We can't wait to work with you! 🎬</h2>
      
      <p>Hi <strong>{{ .Name }}</strong>,</p>
      
      <p>Your booking has been confirmed! Here are your session details:</p>
      
      <div class="booking-details">
        <div class="detail-row">
          <strong>Service:</strong>
          <span>{{ .Service }}</span>
        </div>
        <div class="detail-row">
          <strong>Date:</strong>
          <span>{{ .Date }}</span>
        </div>
        <div class="detail-row">
          <strong>Location:</strong>
          <span>{{ .Location }}</span>
        </div>
        <div class="detail-row">
          <strong>Contact:</strong>
          <span>{{ .Email }}</span>
        </div>
      </div>
      
      <h3 style="color: #A68F59;">What happens next?</h3>
      <ol style="color: #121212;">
        <li>📞 We'll call you within 24-48 hours to confirm final details</li>
        <li>📋 You'll receive a pre-session questionnaire</li>
        <li>🎨 We'll discuss your vision and creative direction</li>
        <li>📸 Session day - arrive 10 minutes early!</li>
        <li>✨ Edited photos/videos delivered within timeline</li>
      </ol>
      
      <div style="background-color: #FFF9F0; border-left: 4px solid #A68F59; padding: 15px; margin: 20px 0;">
        <strong>💡 Pro Tip:</strong> Check out our <a href="https://creova.ca/blog" style="color: #B1643B;">blog</a> for preparation tips and style inspiration!
      </div>
      
      <p>Have questions before your session? Reply to this email or call us at <strong style="color: #121212;">(416) XXX-XXXX</strong>.</p>
      
      <p style="margin-top: 30px;">
        <strong>See you soon,</strong><br>
        <span style="color: #A68F59;">The CREOVA Team</span>
      </p>
    </div>
    
    <div class="footer">
      <p><strong>CREOVA Creative Studio</strong><br>
      Ontario, Canada<br>
      <a href="https://creova.ca" style="color: #A68F59; text-decoration: none;">creova.ca</a></p>
      
      <p style="margin-top: 15px;">
        <a href="https://creova.ca/terms-of-service" style="color: #7A6F66; text-decoration: none; margin: 0 10px;">Terms</a> |
        <a href="https://creova.ca/privacy-policy" style="color: #7A6F66; text-decoration: none; margin: 0 10px;">Privacy</a>
      </p>
    </div>
  </div>
</body>
</html>
```

---

### **4. MEMBERSHIP SUBSCRIPTION CONFIRMATION**

**Subject:** Welcome to CREOVA {{ .MembershipTier }} Membership! 👑

**HTML Template:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #F5F1EB;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #FFFFFF;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    }
    .header {
      background: linear-gradient(135deg, #A68F59 0%, #B1643B 100%);
      padding: 50px 20px;
      text-align: center;
    }
    .header h1 {
      color: #FFFFFF;
      margin: 0;
      font-size: 36px;
      font-weight: 300;
      letter-spacing: 3px;
    }
    .content {
      padding: 40px 30px;
      color: #121212;
    }
    .benefits {
      background-color: #F5F1EB;
      border-radius: 8px;
      padding: 25px;
      margin: 25px 0;
    }
    .benefit-item {
      padding: 12px 0;
      display: flex;
      align-items: start;
    }
    .checkmark {
      color: #A68F59;
      margin-right: 12px;
      font-size: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>WELCOME!</h1>
      <p style="color: #FFFFFF; margin: 15px 0 0 0; font-size: 18px; opacity: 0.95;">{{ .MembershipTier }} Member</p>
    </div>
    
    <div class="content">
      <h2 style="color: #121212; margin-top: 0;">You're officially part of the CREOVA family! 🎉</h2>
      
      <p>Hi <strong>{{ .Name }}</strong>,</p>
      
      <p>Thank you for subscribing to <strong style="color: #A68F59;">CREOVA {{ .MembershipTier }}</strong>! Your support helps us continue creating authentic visual stories for the BIPOC community.</p>
      
      <div class="benefits">
        <h3 style="margin-top: 0; color: #121212;">Your Membership Benefits:</h3>
        <div class="benefit-item">
          <span class="checkmark">✓</span>
          <span>Priority booking for all services</span>
        </div>
        <div class="benefit-item">
          <span class="checkmark">✓</span>
          <span>Exclusive discounts on sessions</span>
        </div>
        <div class="benefit-item">
          <span class="checkmark">✓</span>
          <span>Free digital product downloads monthly</span>
        </div>
        <div class="benefit-item">
          <span class="checkmark">✓</span>
          <span>Early access to SEEN fashion drops</span>
        </div>
        <div class="benefit-item">
          <span class="checkmark">✓</span>
          <span>Members-only events & workshops</span>
        </div>
      </div>
      
      <p><strong>Subscription Details:</strong></p>
      <ul>
        <li>Plan: {{ .MembershipTier }}</li>
        <li>Amount: ${{ .Amount }} CAD/year</li>
        <li>Next renewal: {{ .RenewalDate }}</li>
        <li>Payment method: {{ .PaymentMethod }}</li>
      </ul>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://creova.ca/memberships" style="display: inline-block; background-color: #121212; color: #F5F1EB; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 500;">View Your Benefits</a>
      </div>
      
      <p style="margin-top: 30px;">
        <strong>Welcome to the legacy,</strong><br>
        <span style="color: #A68F59;">The CREOVA Team</span>
      </p>
    </div>
    
    <div style="background-color: #E3DCD3; padding: 30px; text-align: center; color: #7A6F66; font-size: 14px;">
      <p><strong>CREOVA Creative Studio</strong><br>
      Ontario, Canada</p>
      <p style="font-size: 12px; margin-top: 15px;">
        Manage your subscription at any time from your <a href="https://creova.ca/memberships" style="color: #A68F59;">account page</a>.
      </p>
    </div>
  </div>
</body>
</html>
```

---

## **Step 2: Configure SMTP Settings**

### **Option 1: Use Supabase Built-in Email (Easiest)**
- Supabase provides 4 emails/hour on free tier
- Upgrade to Pro for unlimited emails
- No SMTP configuration needed

### **Option 2: Custom SMTP (Recommended for Production)**

**Recommended Providers:**
- **SendGrid** (Free: 100 emails/day)
- **Mailgun** (Free: 5,000 emails/month first 3 months)
- **Amazon SES** ($0.10 per 1,000 emails)
- **Postmark** (Free: 100 emails/month)

**Configuration in Supabase:**
1. Go to: Project Settings → Auth → SMTP Settings
2. Enable Custom SMTP
3. Enter SMTP credentials:
   ```
   Host: smtp.sendgrid.net
   Port: 587
   Username: apikey
   Password: YOUR_SENDGRID_API_KEY
   Sender email: hello@creova.ca
   Sender name: CREOVA
   ```

---

## **Step 3: Update AuthPage.tsx**

Remove `email_confirm: true` to enable email verification:

```typescript
// In AuthPage.tsx, change from:
const { data, error } = await supabase.auth.admin.createUser({
  email: 'example@email.com',
  password: 'example-password',
  user_metadata: { name: 'Example Name' },
  email_confirm: true  // ❌ Remove this line
})

// To:
const { data, error } = await supabase.auth.signUp({
  email: formData.email,
  password: formData.password,
  options: {
    data: { name: formData.name },
    emailRedirectTo: 'https://creova.ca/auth/callback'
  }
})
```

---

## **Step 4: Test Emails**

1. Sign up with a test account
2. Check inbox for welcome email
3. Verify email template renders correctly
4. Test password reset flow
5. Check spam folder if not received

---

## **📊 Email Analytics (Optional)**

Track email performance:
- Open rates
- Click-through rates
- Bounce rates
- Unsubscribe rates

**Recommended Tools:**
- SendGrid Email Analytics (built-in)
- Mailgun Analytics (built-in)
- PostHog for custom tracking

---

**Last Updated:** December 12, 2024  
**Maintained by:** CREOVA Development Team
