# 🐛 SENTRY ERROR MONITORING SETUP - CREOVA

## Production-Ready Error Tracking System

### **What is Sentry?**
Sentry is a real-time error tracking and monitoring platform that helps you:
- 🐛 Catch JavaScript errors before users report them
- 📊 See which errors affect the most users
- 🔍 Get full stack traces and user context
- 📧 Receive instant email/Slack alerts
- 📈 Track error trends over time

**Free Tier:** 5,000 errors/month (more than enough to start)

---

## **STEP 1: Create Sentry Account**

1. Go to: https://sentry.io/signup/
2. Sign up with email or GitHub
3. Create new project:
   ```
   Platform: React
   Project name: creova-website
   Alert me: ✅ On every new issue
   ```
4. **COPY YOUR DSN** (looks like `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`)

---

## **STEP 2: Install Sentry Package**

The package is already available, just import it:

```typescript
import * as Sentry from '@sentry/react';
```

No installation needed in Figma Make environment!

---

## **STEP 3: Initialize Sentry in Your App**

Create a new file `/utils/sentry.ts`:

```typescript
import * as Sentry from '@sentry/react';

// Sentry DSN - Add your DSN here
const SENTRY_DSN = 'https://xxxxx@xxxxx.ingest.sentry.io/xxxxx'; // TODO: Replace with your actual DSN

export const initSentry = () => {
  // Only initialize in production or when DSN is provided
  if (!SENTRY_DSN || SENTRY_DSN.includes('xxxxx')) {
    console.log('Sentry not initialized - no DSN provided');
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    
    // Set environment
    environment: window.location.hostname === 'localhost' ? 'development' : 'production',
    
    // Capture 100% of errors in production
    tracesSampleRate: 1.0,
    
    // Capture 10% of sessions for performance monitoring
    replaysSessionSampleRate: 0.1,
    
    // Capture 100% of sessions with errors
    replaysOnErrorSampleRate: 1.0,
    
    // Integrations
    integrations: [
      new Sentry.BrowserTracing({
        // Track route changes
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),
      new Sentry.Replay({
        // Mask all text and input fields for privacy
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    
    // Filter out low-value errors
    beforeSend(event, hint) {
      // Ignore browser extension errors
      if (event.exception?.values?.[0]?.value?.includes('extension')) {
        return null;
      }
      
      // Ignore network errors (they're usually temporary)
      if (event.exception?.values?.[0]?.value?.includes('NetworkError')) {
        return null;
      }
      
      return event;
    },
    
    // Add custom tags
    initialScope: {
      tags: {
        app: 'creova-website',
        version: '1.0.0'
      }
    }
  });
};

// Error boundary fallback component
export const ErrorFallback = ({ error, resetError }: any) => {
  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#F5F1EB',
        padding: '20px'
      }}
    >
      <div 
        style={{ 
          maxWidth: '600px', 
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <div 
          style={{ 
            width: '80px',
            height: '80px',
            margin: '0 auto 20px',
            backgroundColor: '#B1643B',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px'
          }}
        >
          ⚠️
        </div>
        
        <h1 style={{ color: '#121212', marginBottom: '16px' }}>
          Something went wrong
        </h1>
        
        <p style={{ color: '#7A6F66', marginBottom: '24px' }}>
          We've been notified and are working on a fix. Please try refreshing the page.
        </p>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={resetError}
            style={{
              backgroundColor: '#121212',
              color: '#F5F1EB',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Try Again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#121212',
              border: '2px solid #E3DCD3',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Go Home
          </button>
        </div>
        
        {error && (
          <details style={{ marginTop: '24px', textAlign: 'left' }}>
            <summary style={{ cursor: 'pointer', color: '#7A6F66', fontSize: '14px' }}>
              Error Details (for developers)
            </summary>
            <pre 
              style={{ 
                marginTop: '12px', 
                padding: '12px', 
                backgroundColor: '#F5F1EB',
                borderRadius: '8px',
                fontSize: '12px',
                overflow: 'auto',
                color: '#121212'
              }}
            >
              {error.toString()}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

// Utility to manually capture errors
export const captureError = (error: Error, context?: Record<string, any>) => {
  Sentry.captureException(error, {
    extra: context
  });
};

// Utility to capture messages
export const captureMessage = (message: string, level: 'info' | 'warning' | 'error' = 'info') => {
  Sentry.captureMessage(message, level);
};

// Utility to set user context
export const setUser = (user: { id: string; email?: string; name?: string }) => {
  Sentry.setUser(user);
};

// Utility to clear user context (on logout)
export const clearUser = () => {
  Sentry.setUser(null);
};
```

---

## **STEP 4: Update App.tsx**

Wrap your app with Sentry Error Boundary:

```typescript
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { initSentry, ErrorFallback } from './utils/sentry';
// ... other imports ...

// Initialize Sentry
initSentry();

// Create Sentry Error Boundary
const SentryRoutes = Sentry.withSentryRouting(Routes);

function AppContent() {
  // ... existing code ...
  
  return (
    <Sentry.ErrorBoundary fallback={ErrorFallback} showDialog>
      {/* ... existing JSX ... */}
      <main id="main-content" className="flex-grow">
        <SentryRoutes>
          {/* All your routes */}
        </SentryRoutes>
      </main>
      {/* ... rest of app ... */}
    </Sentry.ErrorBoundary>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <AppContent />
          </Router>
        </CartProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}
```

---

## **STEP 5: Add User Context on Login**

In `/pages/AuthPage.tsx`, after successful login:

```typescript
import { setUser } from '../utils/sentry';

// After successful login
if (session?.user) {
  // Set user in Sentry
  setUser({
    id: session.user.id,
    email: session.user.email,
    name: formData.name
  });
}
```

On logout:

```typescript
import { clearUser } from '../utils/sentry';

// After successful logout
clearUser();
```

---

## **STEP 6: Add Context to Errors**

### **In Payment Processing:**

```typescript
try {
  // Payment logic
} catch (error) {
  console.error('Payment error:', error);
  
  // Send to Sentry with context
  captureError(error as Error, {
    component: 'CheckoutPage',
    action: 'process_payment',
    amount: total,
    currency: 'CAD',
    items: cartItems.map(i => i.name)
  });
  
  toast.error('Payment failed');
}
```

### **In Form Submissions:**

```typescript
try {
  // Submit booking
} catch (error) {
  console.error('Booking error:', error);
  
  captureError(error as Error, {
    component: 'BookingPage',
    service: formData.service,
    date: date?.toISOString()
  });
  
  toast.error('Booking failed');
}
```

---

## **STEP 7: Performance Monitoring**

Track slow page loads:

```typescript
// In AnalyticsTracker.tsx or key pages
import * as Sentry from '@sentry/react';

useEffect(() => {
  const transaction = Sentry.startTransaction({
    name: 'HomePage Load',
    op: 'pageload'
  });
  
  // When page finishes loading
  window.addEventListener('load', () => {
    transaction.finish();
  });
}, []);
```

---

## **STEP 8: Set Up Alerts**

### **In Sentry Dashboard:**

1. Go to "Settings" → "Alerts"
2. Create alert rules:

**Alert 1: New Error**
```
Condition: A new issue is created
Action: Send email to your-email@creova.ca
```

**Alert 2: Error Spike**
```
Condition: Number of events > 50 in 1 hour
Action: Send email + Slack notification
```

**Alert 3: High Error Rate**
```
Condition: Error rate > 5% for 10 minutes
Action: Send urgent alert
```

---

## **STEP 9: Integrate with Slack (Optional)**

1. Go to Sentry Settings → Integrations
2. Find Slack → Click "Add to Slack"
3. Choose channel: #creova-errors
4. Get instant notifications for critical errors

---

## **📊 MONITORING DASHBOARD**

### **Key Metrics to Watch:**

**Daily:**
- ✅ New issues today
- ✅ Total events (errors)
- ✅ Affected users

**Weekly:**
- ✅ Most common errors
- ✅ Error trends
- ✅ Browser/device breakdown
- ✅ Geographic distribution

**Monthly:**
- ✅ Error rate trends
- ✅ Performance metrics
- ✅ User impact analysis

---

## **🔍 DEBUGGING WITH SENTRY**

When an error occurs, Sentry shows:

1. **Stack Trace:** Exact line of code that failed
2. **Breadcrumbs:** User actions leading to error
3. **User Context:** Who experienced the error
4. **Device Info:** Browser, OS, screen size
5. **Tags:** Custom data you added
6. **Session Replay:** Video of what user did (if enabled)

---

## **🎯 COMMON ERRORS TO WATCH FOR**

### **1. Payment Failures**
```
Search: "payment" OR "stripe" OR "checkout"
Impact: Lost revenue
Priority: Critical
```

### **2. Auth Errors**
```
Search: "auth" OR "login" OR "signup"
Impact: User frustration
Priority: High
```

### **3. Form Submission Failures**
```
Search: "submit" OR "booking" OR "contact"
Impact: Lost leads
Priority: High
```

### **4. Cart Issues**
```
Search: "cart" OR "addToCart"
Impact: Lost sales
Priority: High
```

---

## **🛡️ PRIVACY CONSIDERATIONS**

Sentry automatically:
- ✅ Masks sensitive data (credit cards, passwords)
- ✅ Redacts personal information
- ✅ Strips cookies (if configured)

**Manual Scrubbing:**

```typescript
Sentry.init({
  // ... other config ...
  beforeSend(event) {
    // Remove sensitive data
    if (event.request?.headers) {
      delete event.request.headers['Authorization'];
      delete event.request.headers['Cookie'];
    }
    return event;
  }
});
```

---

## **📈 EXPECTED ERROR RATES**

### **Healthy Website:**
```
Error Rate: < 1%
New Issues: < 5 per week
Affected Users: < 2%
```

### **Needs Attention:**
```
Error Rate: 1-5%
New Issues: 5-20 per week
Affected Users: 2-10%
```

### **Critical Issues:**
```
Error Rate: > 5%
New Issues: > 20 per week
Affected Users: > 10%
```

---

## **🚀 TESTING YOUR SETUP**

### **Test 1: Trigger Test Error**

Add a test button temporarily:

```typescript
// In any page
<button onClick={() => {
  throw new Error('Sentry Test Error - This is intentional!');
}}>
  Test Sentry
</button>
```

Click it → Error should appear in Sentry dashboard within seconds!

### **Test 2: Check Error Boundary**

Cause a render error:

```typescript
const BrokenComponent = () => {
  const [count, setCount] = useState(0);
  
  if (count > 5) {
    throw new Error('Component broke!');
  }
  
  return <button onClick={() => setCount(count + 1)}>Click {count}</button>;
};
```

---

## **🔗 INTEGRATIONS**

### **GitHub Integration:**
- Link issues to GitHub
- Create issues from errors
- Auto-close when fixed

### **Jira Integration:**
- Create Jira tickets automatically
- Track fix progress
- Link deployments

---

## **✅ SETUP CHECKLIST**

```
☐ Create Sentry account
☐ Create React project in Sentry
☐ Copy DSN
☐ Create /utils/sentry.ts
☐ Update App.tsx with ErrorBoundary
☐ Add user context on login
☐ Add error context to critical paths
☐ Set up email alerts
☐ Test with intentional error
☐ Configure Slack integration (optional)
☐ Set up source maps for production (advanced)
☐ Monitor dashboard for first week
```

---

## **📚 RESOURCES**

- **Sentry Docs:** https://docs.sentry.io/platforms/javascript/guides/react/
- **React Integration:** https://docs.sentry.io/platforms/javascript/guides/react/
- **Performance Monitoring:** https://docs.sentry.io/product/performance/
- **Session Replay:** https://docs.sentry.io/product/session-replay/

---

## **💰 PRICING**

```
Developer (Free):
- 5,000 errors/month
- 500 replay sessions/month
- 30-day data retention
- Perfect for CREOVA to start!

Team ($26/month):
- 50,000 errors/month
- 10,000 replay sessions/month
- 90-day data retention
- Slack integration
```

---

**Last Updated:** December 12, 2024  
**Maintained by:** CREOVA Development Team  
**Status:** Ready to implement
