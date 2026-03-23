# 💳 Payment Setup Guide - CREOVA

This guide will help you set up Stripe payments with credit/debit cards and Apple Pay for the CREOVA web application.

## 🎯 Overview

The payment system is fully integrated and includes:
- ✅ Credit/Debit Card Payments
- ✅ Apple Pay Support
- ✅ Secure Checkout Flow
- ✅ Order Confirmation
- ✅ Backend Payment Processing
- ✅ HST (13%) Tax Calculation
- ✅ Free Shipping over $100

## 📋 Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. Access to Supabase project settings
3. Test mode API keys for development

## 🔧 Setup Steps

### Step 1: Get Your Stripe API Keys

1. **Go to Stripe Dashboard**
   - Visit: https://dashboard.stripe.com/test/apikeys
   - Make sure you're in "Test Mode" (toggle in top right)

2. **Copy Your Keys**
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`) - Click "Reveal test key"

### Step 2: Update Frontend Stripe Key

1. **Open `/pages/CheckoutPage.tsx`**
2. **Find line 14** (around line 14):
   ```typescript
   const stripePromise = loadStripe('pk_test_51QVaLrH4xQb5VKlC9vOvF9dXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
   ```
3. **Replace with your Publishable Key**:
   ```typescript
   const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY_HERE');
   ```

### Step 3: Add Stripe Secret Key to Supabase

1. **Go to Supabase Dashboard**
   - Open your project: https://supabase.com/dashboard/project/YOUR_PROJECT_ID

2. **Navigate to Settings**
   - Click "Settings" (gear icon) in sidebar
   - Click "Edge Functions" or "Secrets"

3. **Add Environment Variable**
   - Click "Add new secret"
   - **Name**: `STRIPE_SECRET_KEY`
   - **Value**: Your Stripe Secret Key (starts with `sk_test_...`)
   - Click "Save"

### Step 4: Test the Payment Flow

1. **Add Items to Cart**
   - Go to /shop or /digital-products
   - Add any item to cart

2. **Go to Checkout**
   - Click cart icon in navigation
   - Click "Checkout" button

3. **Fill in Customer Information**
   - Enter test customer details
   - Use any valid Canadian address

4. **Test Card Payment**
   - Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date (e.g., 12/34)
   - Any 3-digit CVC (e.g., 123)
   - Any postal code

5. **Test Apple Pay** (if available)
   - Apple Pay will automatically appear if:
     - You're on Safari browser
     - You have Apple Pay set up on your device
     - You're using HTTPS (or localhost)

## 🧪 Stripe Test Cards

Use these test cards for different scenarios:

| Card Number | Scenario |
|-------------|----------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0025 0000 3155 | Requires 3D Secure authentication |
| 4000 0000 0000 9995 | Declined card |

**For all test cards:**
- Expiry: Any future date (e.g., 12/34)
- CVC: Any 3 digits (e.g., 123)
- Postal Code: Any valid format

## 🔐 Security Features

The payment system includes:

✅ **SSL Encryption** - All data encrypted in transit
✅ **PCI Compliance** - Stripe handles all card data
✅ **Secure Tokens** - No card data stored on your servers
✅ **3D Secure** - Additional authentication when needed
✅ **Fraud Detection** - Stripe's built-in fraud prevention

## 🌐 Apple Pay Setup

Apple Pay is automatically enabled when you use Stripe. Requirements:

1. **Domain Verification** (Production only)
   - Add your domain in Stripe Dashboard
   - Upload domain verification file
   - Stripe handles the rest

2. **Browser Requirements**
   - Safari on Mac, iPhone, or iPad
   - Chrome/Edge with Apple Pay enabled
   - HTTPS connection (production)

## 📦 Order Flow

1. **Customer adds items** → Cart Context stores items
2. **Clicks Checkout** → Navigates to /checkout
3. **Fills information** → Customer details & address
4. **Creates Payment Intent** → Backend generates client secret
5. **Enters payment** → Stripe Elements handles card/Apple Pay
6. **Processes payment** → Stripe confirms transaction
7. **Order confirmation** → Redirects to /order-confirmation
8. **Email receipt** → Stripe sends receipt automatically

## 🎨 Customization

### Update Pricing

Edit these files to change prices:
- `/pages/ShopPage.tsx` - SEEN clothing products
- `/pages/DigitalProductsPage.tsx` - Digital products
- `/pages/EventsCollaboratePage.tsx` - Workshop tickets

### Change Tax Rate

Edit `/pages/CheckoutPage.tsx` line ~253:
```typescript
const hst = subtotal * 0.13; // Change 0.13 to your tax rate
```

### Modify Shipping

Edit `/pages/CheckoutPage.tsx` line ~254:
```typescript
const shipping = subtotal >= 100 ? 0 : 15; // Change threshold and fee
```

## 🐛 Troubleshooting

### "Payment configuration error"
- ✅ Check that STRIPE_SECRET_KEY is set in Supabase
- ✅ Verify the key starts with `sk_test_` (or `sk_live_` for production)

### "Failed to initialize payment"
- ✅ Check browser console for errors
- ✅ Verify publishable key is correct in CheckoutPage.tsx
- ✅ Ensure you're connected to internet

### Apple Pay not showing
- ✅ Use Safari browser
- ✅ Ensure HTTPS (or localhost)
- ✅ Check that Apple Pay is set up on device
- ✅ Domain must be verified for production

### Payment Intent creation fails
- ✅ Check Supabase Function logs
- ✅ Verify STRIPE_SECRET_KEY is correct
- ✅ Check that amount is valid (must be positive integer in cents)

## 🚀 Going Live (Production)

When ready to accept real payments:

1. **Switch to Live Mode in Stripe**
   - Toggle from "Test" to "Live" in Stripe Dashboard

2. **Get Live API Keys**
   - Copy Live Publishable Key (starts with `pk_live_...`)
   - Copy Live Secret Key (starts with `sk_live_...`)

3. **Update Environment Variables**
   - Update `stripePromise` in CheckoutPage.tsx with live publishable key
   - Update STRIPE_SECRET_KEY in Supabase with live secret key

4. **Verify Domain for Apple Pay**
   - Add your production domain in Stripe Dashboard
   - Download and host the verification file

5. **Test Thoroughly**
   - Test with real (small amount) transactions
   - Verify email receipts
   - Check order confirmations

## 📞 Support

**Stripe Documentation**: https://stripe.com/docs
**Stripe Support**: https://support.stripe.com
**Supabase Docs**: https://supabase.com/docs

## ✅ Checklist

Before launching:
- [ ] Stripe account created
- [ ] Test API keys configured
- [ ] Test payments successful
- [ ] Apple Pay tested (if needed)
- [ ] Live API keys ready
- [ ] Domain verified for Apple Pay
- [ ] Email receipts working
- [ ] Order confirmation page tested
- [ ] Tax calculations verified
- [ ] Shipping logic tested

---

**🎉 Your payment system is ready!** Customers can now purchase SEEN fashion items, digital products, and workshop tickets with secure credit/debit card and Apple Pay payments.
