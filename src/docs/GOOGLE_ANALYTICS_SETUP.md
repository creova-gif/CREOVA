# 📊 GOOGLE ANALYTICS 4 SETUP GUIDE - CREOVA

## Complete GA4 Integration for CREOVA Website

### **Step 1: Create Google Analytics 4 Property**

1. Go to: https://analytics.google.com/
2. Click "Admin" (gear icon in bottom left)
3. Click "+ Create Property"
4. Fill in property details:
   ```
   Property name: CREOVA Creative Studio
   Reporting time zone: (UTC-05:00) Eastern Time
   Currency: Canadian Dollar (CAD)
   ```
5. Click "Next"
6. Fill in business details:
   ```
   Industry: Arts & Entertainment
   Business size: Small (1-10 employees)
   ```
7. Select business objectives:
   - ✅ Generate leads
   - ✅ Sell products or services online
   - ✅ Examine user behavior
8. Click "Create" → Accept Terms of Service

---

### **Step 2: Set Up Data Stream**

1. Select "Web" platform
2. Enter website details:
   ```
   Website URL: https://creova.ca
   Stream name: CREOVA Website
   ```
3. ✅ Enable "Enhanced measurement" (recommended)
   - This automatically tracks:
     - Page views
     - Scrolls
     - Outbound clicks
     - Site search
     - Video engagement
     - File downloads
4. Click "Create stream"
5. **COPY YOUR MEASUREMENT ID** (looks like `G-XXXXXXXXXX`)

---

### **Step 3: Add Measurement ID to CREOVA Website**

1. Open `/components/AnalyticsTracker.tsx`
2. Replace the placeholder:
   ```typescript
   // Change from:
   const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
   
   // To:
   const GA_MEASUREMENT_ID = 'G-ABC123DEF4'; // Your actual ID
   ```
3. Save the file
4. Deploy the update

---

### **Step 4: Verify Installation**

1. Visit your website: https://creova.ca
2. Open Google Analytics dashboard
3. Go to "Reports" → "Realtime"
4. You should see yourself as an active user!
5. Navigate to different pages to verify tracking

---

## **📈 RECOMMENDED EVENTS TO TRACK**

The AnalyticsTracker already tracks page views. Add these custom events throughout your website:

### **1. Booking Events**

In `/pages/BookingPage.tsx`, after successful submission:

```typescript
// Track booking submission
if (typeof (window as any).trackEvent === 'function') {
  (window as any).trackEvent('booking_submitted', {
    service: formData.service,
    date: date,
    value: 500 // estimated booking value
  });
}

// Also track in Google Analytics
if (typeof (window as any).gtag === 'function') {
  (window as any).gtag('event', 'generate_lead', {
    event_category: 'Booking',
    event_label: formData.service,
    value: 500
  });
}
```

---

### **2. Add to Cart Events**

In `/context/CartContext.tsx`:

```typescript
const addToCart = (item: CartItem) => {
  // ... existing code ...
  
  // Track add to cart
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'add_to_cart', {
      currency: 'CAD',
      value: item.price,
      items: [{
        item_id: item.id,
        item_name: item.name,
        item_category: item.type,
        price: item.price,
        quantity: 1
      }]
    });
  }
};
```

---

### **3. Purchase Events**

In `/pages/PaymentSuccessPage.tsx`:

```typescript
useEffect(() => {
  // Track purchase
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'purchase', {
      transaction_id: orderId,
      value: totalAmount,
      currency: 'CAD',
      tax: totalAmount * 0.13,
      items: cartItems.map(item => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.type,
        price: item.price,
        quantity: item.quantity || 1
      }))
    });
  }
}, []);
```

---

### **4. Membership Subscription Events**

In `/pages/MembershipsPage.tsx`:

```typescript
// When user clicks subscribe
if (typeof (window as any).gtag === 'function') {
  (window as any).gtag('event', 'begin_checkout', {
    currency: 'CAD',
    value: tier === 'creator' ? 299 : 599,
    items: [{
      item_id: `membership_${tier}`,
      item_name: `${tier.charAt(0).toUpperCase() + tier.slice(1)} Membership`,
      item_category: 'Membership',
      price: tier === 'creator' ? 299 : 599
    }]
  });
}
```

---

### **5. Form Interactions**

Track CAPTCHA completion:

```typescript
const handleCaptchaVerify = (token: string) => {
  setCaptchaToken(token);
  
  // Track CAPTCHA success
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'captcha_verified', {
      event_category: 'Security',
      event_label: 'reCAPTCHA'
    });
  }
};
```

---

## **🎯 CUSTOM CONVERSIONS TO SET UP**

### **In Google Analytics Admin:**

1. Go to "Admin" → "Events"
2. Click "Create event"
3. Set up these conversion events:

**Conversion Event 1: Booking Submitted**
```
Event name: booking_submitted
Mark as conversion: ✅
```

**Conversion Event 2: Purchase**
```
Event name: purchase
Mark as conversion: ✅ (should be automatic)
```

**Conversion Event 3: Membership Subscribed**
```
Event name: begin_checkout
Conditions: item_category = "Membership"
Mark as conversion: ✅
```

**Conversion Event 4: Contact Form Submitted**
```
Event name: contact_submitted
Mark as conversion: ✅
```

---

## **📊 RECOMMENDED REPORTS & DASHBOARDS**

### **1. Acquisition Report**
Shows where your traffic comes from:
- Go to "Reports" → "Acquisition" → "Traffic acquisition"
- Track: Organic search, Direct, Referral, Social, Paid

### **2. Engagement Report**
Shows what users do:
- Go to "Reports" → "Engagement" → "Pages and screens"
- See which pages get most views
- Identify high-exit pages

### **3. Monetization Report**
Shows revenue data:
- Go to "Reports" → "Monetization" → "Ecommerce purchases"
- Track total revenue, average order value, purchase-to-detail rate

### **4. Custom Funnel Analysis**

Create a funnel to track conversion paths:

1. Go to "Explore" → "Funnel exploration"
2. Create funnel:
   ```
   Step 1: page_view (path contains /services)
   Step 2: page_view (path contains /booking)
   Step 3: booking_submitted
   ```

---

## **🔍 KEY METRICS TO MONITOR**

### **Daily Checks:**
- ✅ Active users (last 30 minutes)
- ✅ Conversions today
- ✅ Revenue today

### **Weekly Analysis:**
- ✅ Traffic sources
- ✅ Top landing pages
- ✅ Conversion rate trends
- ✅ Cart abandonment rate

### **Monthly Reviews:**
- ✅ Month-over-month growth
- ✅ User retention
- ✅ Channel performance
- ✅ Device breakdown (mobile vs desktop)
- ✅ Geographic distribution

---

## **🎨 RECOMMENDED GA4 GOALS FOR CREOVA**

Set target metrics:

```
Goal 1: Booking Conversions
Target: 50 bookings/month → Track "booking_submitted" event

Goal 2: E-Commerce Revenue
Target: $5,000 CAD/month → Track "purchase" event revenue

Goal 3: Membership Sign-ups
Target: 20 memberships/month → Track membership subscriptions

Goal 4: Contact Form Submissions
Target: 100 leads/month → Track "contact_submitted" event

Goal 5: Equipment Rental Requests
Target: 15 rentals/month → Track "rental_submitted" event
```

---

## **🔗 INTEGRATION WITH GOOGLE SEARCH CONSOLE**

1. Go to GA4 Admin → "Product links"
2. Click "Link Search Console"
3. Select your Search Console property
4. Benefits:
   - See organic search queries
   - Track keyword performance
   - Identify SEO opportunities

---

## **🛡️ PRIVACY & GDPR COMPLIANCE**

GA4 includes privacy features, but you should:

1. **Add Cookie Consent Banner** (future enhancement):
   ```typescript
   // Allow users to opt-out of tracking
   window['ga-disable-G-XXXXXXXXXX'] = true;
   ```

2. **Update Privacy Policy:**
   - Disclose Google Analytics usage
   - Explain data collection
   - Provide opt-out link

3. **Enable IP Anonymization** (enabled by default in GA4)

---

## **📱 MOBILE APP TRACKING (Future)**

When you build a mobile app:

1. Create separate data stream for iOS/Android
2. Use Firebase SDK
3. Track in-app events
4. Cross-platform user journeys

---

## **🔔 SET UP ALERTS**

Create custom alerts for important changes:

### **Alert 1: Traffic Drop**
```
Metric: Sessions
Condition: Decreases by > 30% day-over-day
Email: your-email@creova.ca
```

### **Alert 2: Conversion Spike**
```
Metric: Conversions (booking_submitted)
Condition: Increases by > 50% day-over-day
Email: your-email@creova.ca
```

### **Alert 3: Revenue Goal**
```
Metric: E-commerce revenue
Condition: Exceeds $5,000 in a day
Email: your-email@creova.ca
```

---

## **🧪 TESTING YOUR SETUP**

### **Real-Time Testing:**
1. Open GA4 Realtime report
2. Visit your website in incognito mode
3. Navigate through pages
4. Add items to cart
5. Submit a booking
6. Verify all events appear in realtime

### **DebugView (Advanced):**
1. Install Chrome extension "Google Analytics Debugger"
2. Enable debug mode
3. See detailed event data in GA4 DebugView

---

## **📚 RESOURCES**

- **GA4 Help Center:** https://support.google.com/analytics/
- **GA4 Learning Course:** https://analytics.google.com/analytics/academy/
- **GA4 Community:** https://www.en.advertisercommunity.com/t5/Google-Analytics-4/ct-p/google-analytics-4
- **CREOVA Analytics Dashboard:** https://creova.ca/analytics/dashboard

---

## **🚀 QUICK START CHECKLIST**

```
☐ Create GA4 property
☐ Set up Web data stream
☐ Copy Measurement ID
☐ Add ID to AnalyticsTracker.tsx
☐ Deploy website
☐ Verify tracking in Realtime report
☐ Set up conversion events
☐ Link Google Search Console
☐ Create custom reports
☐ Set up alert notifications
☐ Update privacy policy
☐ Add event tracking to key actions
```

---

**Last Updated:** December 12, 2024  
**Maintained by:** CREOVA Development Team  
**Questions?** Check Analytics Dashboard or contact support
