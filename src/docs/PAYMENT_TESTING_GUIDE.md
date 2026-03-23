# 🧪 PAYMENT TESTING GUIDE - CREOVA

## Complete End-to-End Payment Testing Checklist

### **🎯 Before You Start**

1. **Access Stripe Dashboard**
   - Login to: https://dashboard.stripe.com/test/dashboard
   - Ensure you're in TEST MODE (toggle in top right)
   - Have your test API keys ready

2. **Test Credit Cards (Stripe Test Mode)**
   ```
   ✅ Successful Payment:
   Card: 4242 4242 4242 4242
   Expiry: Any future date (e.g., 12/25)
   CVC: Any 3 digits (e.g., 123)
   ZIP: Any 5 digits (e.g., 12345)

   ❌ Card Declined:
   Card: 4000 0000 0000 0002
   
   ⚠️ Requires Authentication (3D Secure):
   Card: 4000 0025 0000 3155
   
   ⏳ Processing Delay:
   Card: 4000 0000 0000 9995
   
   💰 Insufficient Funds:
   Card: 4000 0000 0000 9995
   ```

---

## **TEST 1: Creator Membership ($299 CAD/year)**

### Steps:
1. ✅ Navigate to `/memberships`
2. ✅ Click "Subscribe Now" on Creator Membership
3. ✅ Verify redirect to Stripe Checkout
4. ✅ Fill in test card details: `4242 4242 4242 4242`
5. ✅ Complete payment
6. ✅ Verify redirect back to success page
7. ✅ Check Stripe Dashboard for successful payment
8. ✅ Verify user receives confirmation email (if configured)
9. ✅ Check database that subscription is recorded

### Expected Results:
- ✅ Amount charged: $299 CAD + 13% HST = $338.87 CAD
- ✅ Subscription status: Active
- ✅ Renewal date: 1 year from today

---

## **TEST 2: Legacy Membership ($599 CAD/year)**

### Steps:
1. ✅ Navigate to `/memberships`
2. ✅ Click "Subscribe Now" on Legacy Membership
3. ✅ Verify redirect to Stripe Checkout
4. ✅ Fill in test card details: `4242 4242 4242 4242`
5. ✅ Complete payment
6. ✅ Verify redirect back to success page
7. ✅ Check Stripe Dashboard for successful payment

### Expected Results:
- ✅ Amount charged: $599 CAD + 13% HST = $677.87 CAD
- ✅ Subscription status: Active
- ✅ All premium features unlocked

---

## **TEST 3: E-Commerce Product Purchase**

### Steps:
1. ✅ Navigate to `/shop`
2. ✅ Add 2-3 products to cart
3. ✅ Click cart icon in navigation
4. ✅ Verify cart totals (subtotal + 13% HST)
5. ✅ Click "Proceed to Checkout"
6. ✅ Fill in shipping information
7. ✅ Enter test card: `4242 4242 4242 4242`
8. ✅ Complete purchase
9. ✅ Verify order confirmation page
10. ✅ Check Stripe Dashboard

### Expected Results:
- ✅ Correct subtotal calculation
- ✅ 13% HST applied correctly
- ✅ Payment processed successfully
- ✅ Order confirmation displayed

---

## **TEST 4: Event Ticket Purchase**

### Steps:
1. ✅ Navigate to `/experience`
2. ✅ Find an event with tickets
3. ✅ Click "Add to Cart"
4. ✅ Proceed to checkout
5. ✅ Complete payment with test card
6. ✅ Verify ticket confirmation

### Expected Results:
- ✅ Ticket added to cart
- ✅ Correct pricing with HST
- ✅ Payment successful
- ✅ Ticket details stored in database

---

## **TEST 5: Digital Product Purchase**

### Steps:
1. ✅ Navigate to `/digital-products`
2. ✅ Select a digital product (preset pack, template, etc.)
3. ✅ Add to cart
4. ✅ Complete checkout
5. ✅ Verify download access after payment

### Expected Results:
- ✅ Instant digital delivery
- ✅ Download link provided
- ✅ Payment recorded

---

## **TEST 6: Refund Process (Admin)**

### Steps:
1. ✅ Login to admin panel
2. ✅ Navigate to `/admin/refunds`
3. ✅ Select a test payment
4. ✅ Click "Refund"
5. ✅ Enter refund amount
6. ✅ Submit refund
7. ✅ Check Stripe Dashboard for refund

### Expected Results:
- ✅ Refund processed successfully
- ✅ Stripe shows refund status
- ✅ Database updated

---

## **TEST 7: Failed Payment Scenarios**

### Test 7.1: Declined Card
```
Card: 4000 0000 0000 0002
```
- ✅ Should show clear error message
- ✅ User can retry with different card
- ✅ No charge recorded in Stripe

### Test 7.2: Expired Card
```
Card: 4000 0000 0000 0069
```
- ✅ Should prevent submission
- ✅ Clear error message displayed

### Test 7.3: Incomplete Payment Details
- ✅ Try submitting without CVC
- ✅ Try submitting without expiry
- ✅ Verify form validation works

---

## **TEST 8: Stripe Webhooks (Advanced)**

### Steps:
1. ✅ Go to Stripe Dashboard → Developers → Webhooks
2. ✅ Check webhook endpoint is configured:
   ```
   https://{projectId}.supabase.co/functions/v1/make-server-feacf0d8/stripe-webhook
   ```
3. ✅ Test webhook events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

### Expected Results:
- ✅ Webhooks received and processed
- ✅ Database updated automatically
- ✅ User notifications sent (if configured)

---

## **TEST 9: Security & Edge Cases**

### Test 9.1: Multiple Submit Attempts
- ✅ Try clicking "Pay" button multiple times rapidly
- ✅ Should only process ONE payment
- ✅ Button should disable during processing

### Test 9.2: Network Interruption
- ✅ Start payment process
- ✅ Disconnect internet before completion
- ✅ Verify graceful error handling
- ✅ No duplicate charges

### Test 9.3: Session Timeout
- ✅ Add items to cart
- ✅ Wait 30+ minutes
- ✅ Try to checkout
- ✅ Verify session handling

---

## **TEST 10: Mobile Testing**

### Steps:
1. ✅ Test all payment flows on mobile device
2. ✅ Verify Stripe Elements render correctly
3. ✅ Test Apple Pay (if enabled)
4. ✅ Test Google Pay (if enabled)
5. ✅ Verify mobile checkout experience

---

## **📊 TESTING CHECKLIST SUMMARY**

```
☐ Creator Membership ($299) - Success
☐ Legacy Membership ($599) - Success  
☐ E-Commerce Products - Success
☐ Event Tickets - Success
☐ Digital Products - Success
☐ Refund Process - Success
☐ Declined Card - Proper Error
☐ Expired Card - Proper Error
☐ Incomplete Details - Validation Works
☐ Webhook Processing - Success
☐ Double-Submit Prevention - Works
☐ Network Error Handling - Graceful
☐ Mobile Payment - Success
```

---

## **🚨 COMMON ISSUES & FIXES**

### Issue 1: "Payment configuration error"
**Cause:** STRIPE_SECRET_KEY not set in environment variables
**Fix:** Add key in Supabase Dashboard → Edge Functions → Secrets

### Issue 2: Webhook not receiving events
**Cause:** Incorrect webhook URL or signing secret
**Fix:** Verify URL in Stripe Dashboard matches your endpoint

### Issue 3: HST not calculating
**Cause:** Tax calculation logic missing
**Fix:** Verify 13% HST is added in checkout flow

### Issue 4: Redirect not working after payment
**Cause:** Success URL misconfigured
**Fix:** Check Stripe Checkout session success_url parameter

---

## **🎓 NEXT STEPS AFTER TESTING**

1. ✅ **Switch to Live Mode**
   - Replace test API keys with live keys
   - Update webhook endpoint to live mode
   - Test with small real transaction

2. ✅ **Monitor First Live Transactions**
   - Watch Stripe Dashboard closely
   - Verify webhooks are processing
   - Check email confirmations

3. ✅ **Set Up Alerts**
   - Failed payment notifications
   - Unusual activity alerts
   - Refund request notifications

---

## **📞 STRIPE SUPPORT**

If you encounter issues:
- Stripe Support: https://support.stripe.com/
- Stripe Testing Guide: https://stripe.com/docs/testing
- CREOVA Admin Dashboard: `/admin/hub`

---

**Last Updated:** December 12, 2024  
**Version:** 1.0  
**Maintained by:** CREOVA Development Team
