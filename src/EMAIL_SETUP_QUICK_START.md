# ⚡ **EMAIL SETUP - QUICK START (5 MINUTES)**

## 🎯 **YOUR CONFIGURATION**

```
Domain: creova.one
Sender: CREOVA <support@creova.one>
Admin: support@creova.one
```

---

## ✅ **5-MINUTE CHECKLIST**

### **□ Step 1: Sign Up Resend (1 min)**
→ https://resend.com/signup

### **□ Step 2: Add Domain (30 sec)**
Add domain: `creova.one`

### **□ Step 3: Add DNS Records (2 min)**
Add these 3 TXT records to your domain DNS:

```
1. SPF:
   Name: @
   Value: v=spf1 include:resend.com ~all

2. DKIM:
   Name: resend._domainkey
   Value: [COPY FROM RESEND]

3. Verification:
   Name: _resend
   Value: [COPY FROM RESEND]
```

**Where to add:** Your domain registrar's DNS settings

### **□ Step 4: Verify Domain (30 sec)**
Click "Verify Domain" in Resend
Wait for ✅ **Verified** status

### **□ Step 5: Get API Key (30 sec)**
Create API Key → Copy it (starts with `re_`)

### **□ Step 6: Add to Supabase (1 min)**
Supabase Dashboard → Project Settings → Edge Functions → Secrets
```
Name: EMAIL_SERVICE_API_KEY
Value: [Your Resend API key]
```

### **□ Step 7: Test (30 sec)**
Submit test booking at https://www.creova.one/booking
Check your inbox for confirmation email

---

## 🎉 **DONE!**

**You now have:**
✅ Automated booking confirmations (EN/FR)
✅ Admin notifications
✅ Professional emails from support@creova.one
✅ 100% production-ready site

---

## 🆘 **STUCK?**

See full guide: `/RESEND_EMAIL_SETUP_GUIDE.md`

---

**TIME TO LAUNCH:** 5 minutes from now! 🚀
