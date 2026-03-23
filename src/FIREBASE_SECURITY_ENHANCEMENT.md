# CREOVA Firebase Security Enhancement Guide

## Overview

This guide provides additional security measures that can be integrated with your existing Supabase infrastructure using Firebase services to create a multi-layered security approach for the CREOVA platform.

---

## 🔥 Firebase Integration Options

### 1. Firebase App Check (Recommended)

**Purpose**: Protect your backend resources from abuse by ensuring requests come from your authentic app.

**Benefits**:
- DDoS protection
- Bot mitigation
- API abuse prevention
- Token-based verification

#### Setup Steps:

1. **Install Firebase SDK**:
```bash
npm install firebase @firebase/app-check
```

2. **Configure Firebase** (`/utils/firebase/config.ts`):
```typescript
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from '@firebase/app-check';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const firebaseApp = initializeApp(firebaseConfig);

// Initialize App Check with reCAPTCHA v3
export const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('YOUR_RECAPTCHA_V3_SITE_KEY'),
  isTokenAutoRefreshEnabled: true
});
```

3. **Add to Environment Variables**:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. **Verify App Check Tokens in Server** (`/supabase/functions/server/index.tsx`):
```typescript
// Middleware to verify Firebase App Check tokens
const verifyAppCheck = async (c: any, next: any) => {
  const appCheckToken = c.req.header('X-Firebase-AppCheck');
  
  if (!appCheckToken) {
    console.warn('No App Check token provided');
    // In production, you might want to reject requests without tokens
    // return c.json({ error: 'Unauthorized' }, 401);
  }
  
  try {
    // Verify token with Firebase Admin SDK
    const verifyUrl = `https://firebaseappcheck.googleapis.com/v1/projects/${projectId}/apps/${appId}:verifyAppCheckToken`;
    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${firebaseServerKey}`
      },
      body: JSON.stringify({ appCheckToken })
    });
    
    if (!response.ok) {
      console.warn('Invalid App Check token');
      // Log suspicious activity
    }
  } catch (error) {
    console.error('App Check verification error:', error);
  }
  
  await next();
};

// Apply to sensitive routes
app.use('/make-server-feacf0d8/create-payment-intent', verifyAppCheck);
app.use('/make-server-feacf0d8/create-subscription-checkout', verifyAppCheck);
```

---

### 2. Firebase Cloud Messaging (Push Notifications)

**Purpose**: Send security alerts and notifications to admins and users.

#### Use Cases:
- Failed login attempt notifications
- Suspicious activity alerts
- Payment confirmation notifications
- Membership renewal reminders
- Order status updates

#### Implementation:
```typescript
// /utils/firebase/messaging.ts
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseApp } from './config';

const messaging = getMessaging(firebaseApp);

export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'YOUR_VAPID_KEY'
      });
      console.log('FCM Token:', token);
      // Send token to server to store for user
      return token;
    }
  } catch (error) {
    console.error('Notification permission error:', error);
  }
}

export function onMessageListener() {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
}
```

---

### 3. Firebase Performance Monitoring

**Purpose**: Detect performance issues that could indicate security problems.

#### Setup:
```typescript
// /utils/firebase/performance.ts
import { getPerformance } from 'firebase/performance';
import { firebaseApp } from './config';

const perf = getPerformance(firebaseApp);

// Automatically tracks page loads and network requests
export { perf };
```

---

## 🛡️ Enhanced Security Features

### 1. Advanced Input Sanitization

Create a centralized sanitization utility:

```typescript
// /utils/security/sanitize.ts

/**
 * Comprehensive input sanitization for security
 */

// Remove HTML tags to prevent XSS
export function sanitizeHtml(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

// Sanitize SQL-like patterns (defense in depth)
export function sanitizeSQL(input: string): string {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|SCRIPT)\b)/gi,
    /(--|#|\/\*|\*\/)/g,
    /('|(\\')|(\\x27)|(\\u0027))/g
  ];
  
  let sanitized = input;
  sqlPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });
  
  return sanitized.trim();
}

// Sanitize email
export function sanitizeEmail(email: string): string {
  return email
    .toLowerCase()
    .replace(/[^a-z0-9@._+-]/g, '')
    .trim();
}

// Sanitize phone number (Canadian format)
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d+()-\s]/g, '').trim();
}

// Sanitize name (allow unicode for international names)
export function sanitizeName(name: string): string {
  return name
    .replace(/[<>{}[\]\\]/g, '')
    .trim()
    .substring(0, 100); // Max 100 characters
}

// Sanitize general text input
export function sanitizeText(text: string, maxLength: number = 1000): string {
  return sanitizeHtml(text)
    .substring(0, maxLength)
    .trim();
}

// Validate and sanitize URL
export function sanitizeUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    // Only allow http/https
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

// Comprehensive sanitization for form data
export function sanitizeFormData(data: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Detect field type and apply appropriate sanitization
      if (key.toLowerCase().includes('email')) {
        sanitized[key] = sanitizeEmail(value);
      } else if (key.toLowerCase().includes('phone')) {
        sanitized[key] = sanitizePhone(value);
      } else if (key.toLowerCase().includes('name')) {
        sanitized[key] = sanitizeName(value);
      } else if (key.toLowerCase().includes('url') || key.toLowerCase().includes('link')) {
        sanitized[key] = sanitizeUrl(value);
      } else {
        sanitized[key] = sanitizeText(value);
      }
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}
```

---

### 2. Fraud Detection System

```typescript
// /utils/security/fraudDetection.ts

interface FraudCheck {
  score: number; // 0-100, higher = more suspicious
  flags: string[];
  shouldBlock: boolean;
}

export async function checkForFraud(data: {
  email: string;
  ip: string;
  amount?: number;
  cardCountry?: string;
}): Promise<FraudCheck> {
  const flags: string[] = [];
  let score = 0;

  // Check for disposable email
  const disposableDomains = [
    'tempmail.com', 'guerrillamail.com', '10minutemail.com',
    'mailinator.com', 'throwaway.email'
  ];
  
  const emailDomain = data.email.split('@')[1]?.toLowerCase();
  if (disposableDomains.includes(emailDomain)) {
    flags.push('Disposable email detected');
    score += 30;
  }

  // Check for VPN/Proxy (you can integrate with IP quality services)
  // Example: IPQualityScore, MaxMind, etc.
  if (await isVpnOrProxy(data.ip)) {
    flags.push('VPN or proxy detected');
    score += 20;
  }

  // High-value transaction from new customer
  if (data.amount && data.amount > 500) {
    flags.push('High-value transaction');
    score += 15;
  }

  // Country mismatch (if card country doesn't match IP)
  if (data.cardCountry && await getCountryFromIP(data.ip) !== data.cardCountry) {
    flags.push('Country mismatch');
    score += 25;
  }

  // Rapid requests from same IP (check rate limit map)
  const recentRequests = await getRecentRequestCount(data.ip);
  if (recentRequests > 10) {
    flags.push('Excessive requests from IP');
    score += 30;
  }

  return {
    score,
    flags,
    shouldBlock: score >= 60 // Block if score is 60 or higher
  };
}

async function isVpnOrProxy(ip: string): Promise<boolean> {
  // Integrate with IP intelligence service
  // For now, return false (placeholder)
  return false;
}

async function getCountryFromIP(ip: string): Promise<string> {
  // Use IP geolocation service
  // For now, return 'CA' (placeholder)
  return 'CA';
}

async function getRecentRequestCount(ip: string): Promise<number> {
  // Query your rate limit map or database
  // For now, return 0 (placeholder)
  return 0;
}
```

---

### 3. Enhanced Logging & Audit Trail

```typescript
// /utils/security/auditLog.ts

export enum AuditEventType {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  SIGNUP = 'SIGNUP',
  PASSWORD_RESET = 'PASSWORD_RESET',
  PAYMENT_ATTEMPT = 'PAYMENT_ATTEMPT',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  REFUND_REQUESTED = 'REFUND_REQUESTED',
  REFUND_PROCESSED = 'REFUND_PROCESSED',
  DATA_EXPORT = 'DATA_EXPORT',
  DATA_DELETION = 'DATA_DELETION',
  ADMIN_ACCESS = 'ADMIN_ACCESS',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED'
}

export interface AuditLog {
  timestamp: string;
  eventType: AuditEventType;
  userId?: string;
  email?: string;
  ip: string;
  userAgent: string;
  details: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export async function logAuditEvent(log: AuditLog): Promise<void> {
  try {
    // Store in database
    await fetch(`${serverUrl}/audit-log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(log)
    });

    // Also log to console for immediate visibility
    console.log(`[AUDIT] ${log.eventType}:`, log);

    // Send critical alerts
    if (log.severity === 'critical') {
      await sendSecurityAlert(log);
    }
  } catch (error) {
    console.error('Failed to log audit event:', error);
  }
}

async function sendSecurityAlert(log: AuditLog): Promise<void> {
  // Send email or push notification to admin
  // Can integrate with Firebase Cloud Messaging
  console.error('[CRITICAL SECURITY ALERT]:', log);
}
```

---

### 4. Secure Session Management

```typescript
// /utils/security/sessionManager.ts

interface SessionData {
  userId: string;
  email: string;
  lastActivity: number;
  ipAddress: string;
  deviceFingerprint: string;
}

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const MAX_SESSIONS_PER_USER = 5;

export class SessionManager {
  private static instance: SessionManager;
  private sessions = new Map<string, SessionData>();

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  async createSession(
    sessionId: string,
    userId: string,
    email: string,
    ip: string
  ): Promise<boolean> {
    // Check if user has too many active sessions
    const userSessions = Array.from(this.sessions.values())
      .filter(s => s.userId === userId);
    
    if (userSessions.length >= MAX_SESSIONS_PER_USER) {
      console.warn(`User ${userId} exceeded max sessions`);
      return false;
    }

    const deviceFingerprint = await this.generateDeviceFingerprint();

    this.sessions.set(sessionId, {
      userId,
      email,
      lastActivity: Date.now(),
      ipAddress: ip,
      deviceFingerprint
    });

    return true;
  }

  validateSession(sessionId: string, currentIp: string): boolean {
    const session = this.sessions.get(sessionId);
    
    if (!session) {
      return false;
    }

    // Check for session timeout
    if (Date.now() - session.lastActivity > SESSION_TIMEOUT) {
      this.sessions.delete(sessionId);
      return false;
    }

    // Check for IP change (potential session hijacking)
    if (session.ipAddress !== currentIp) {
      console.warn(`Session ${sessionId} IP changed from ${session.ipAddress} to ${currentIp}`);
      // In production, you might want to invalidate the session
      // this.sessions.delete(sessionId);
      // return false;
    }

    // Update last activity
    session.lastActivity = Date.now();
    return true;
  }

  invalidateSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  invalidateAllUserSessions(userId: string): void {
    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.userId === userId) {
        this.sessions.delete(sessionId);
      }
    }
  }

  private async generateDeviceFingerprint(): Promise<string> {
    // Simple device fingerprint (in production, use a library like FingerprintJS)
    const data = [
      navigator.userAgent,
      navigator.language,
      screen.width,
      screen.height,
      new Date().getTimezoneOffset()
    ].join('|');

    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Cleanup expired sessions periodically
  cleanupExpiredSessions(): void {
    const now = Date.now();
    for (const [sessionId, session] of this.sessions.entries()) {
      if (now - session.lastActivity > SESSION_TIMEOUT) {
        this.sessions.delete(sessionId);
      }
    }
  }
}

// Run cleanup every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    SessionManager.getInstance().cleanupExpiredSessions();
  }, 5 * 60 * 1000);
}
```

---

### 5. Content Security Policy (CSP) Enhancement

Update your server to include even stricter CSP headers:

```typescript
// /supabase/functions/server/index.tsx

// Enhanced CSP with Firebase domains
c.header(
  'Content-Security-Policy',
  "default-src 'self'; " +
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' " +
    "https://js.stripe.com " +
    "https://*.supabase.co " +
    "https://www.google.com " +
    "https://www.gstatic.com " +
    "https://www.googletagmanager.com " +
    "https://*.firebase.googleapis.com " +
    "https://*.firebaseapp.com; " +
  "style-src 'self' 'unsafe-inline'; " +
  "img-src 'self' data: https: blob:; " +
  "font-src 'self' data: https://fonts.gstatic.com; " +
  "connect-src 'self' " +
    "https://*.stripe.com " +
    "https://*.supabase.co " +
    "https://www.google.com " +
    "https://*.firebase.googleapis.com " +
    "https://*.firebaseio.com " +
    "wss://*.firebaseio.com; " +
  "frame-src https://js.stripe.com https://hooks.stripe.com https://www.google.com; " +
  "base-uri 'self'; " +
  "form-action 'self' https://checkout.stripe.com;"
);
```

---

## 🔐 Security Best Practices Checklist

### Immediate Actions
- [ ] Set up Firebase project and obtain credentials
- [ ] Enable Firebase App Check for API protection
- [ ] Implement input sanitization on all forms
- [ ] Add fraud detection to payment flows
- [ ] Set up audit logging for critical events
- [ ] Configure Firebase Cloud Messaging for security alerts

### Weekly Monitoring
- [ ] Review audit logs for suspicious activity
- [ ] Check for failed authentication attempts
- [ ] Monitor rate limit violations
- [ ] Review payment fraud scores
- [ ] Check for unusual traffic patterns

### Monthly Security Tasks
- [ ] Update dependencies (`npm audit fix`)
- [ ] Review and rotate API keys
- [ ] Test backup and recovery procedures
- [ ] Review CSP violations (if logging enabled)
- [ ] Analyze security metrics and trends

### Quarterly Reviews
- [ ] Conduct security audit
- [ ] Review and update security policies
- [ ] Test incident response procedures
- [ ] Review access controls and permissions
- [ ] Update Terms of Service and Privacy Policy if needed

---

## 🚨 Incident Response Plan

### 1. Detection
- Monitor logs for suspicious patterns
- Set up alerts for critical events
- Regular security scans

### 2. Containment
- Disable compromised accounts immediately
- Block suspicious IP addresses
- Revoke compromised API keys

### 3. Eradication
- Identify and fix vulnerability
- Update all affected systems
- Change all potentially compromised credentials

### 4. Recovery
- Restore from clean backups if needed
- Monitor for continued attack activity
- Gradually restore full service

### 5. Post-Incident
- Document what happened
- Update security measures
- Notify affected users if required by law
- Improve detection and prevention

---

## 📊 Security Metrics to Track

1. **Authentication**
   - Failed login attempts per hour/day
   - Successful logins by location
   - Password reset requests

2. **API Usage**
   - Rate limit violations
   - Requests by endpoint
   - Average response times

3. **Payments**
   - Fraud detection scores
   - Failed payment attempts
   - Chargeback rate

4. **Data Protection**
   - Encryption status
   - Backup success rate
   - Data access requests

---

## 💡 Additional Recommendations

### 1. Device Fingerprinting
Consider integrating **FingerprintJS** for advanced device identification:
```bash
npm install @fingerprintjs/fingerprintjs-pro
```

### 2. IP Intelligence
Integrate with services like:
- **IPQualityScore** - VPN/proxy detection
- **MaxMind GeoIP2** - Geolocation and fraud detection
- **Cloudflare** - DDoS protection and bot management

### 3. Web Application Firewall (WAF)
Consider using:
- **Cloudflare WAF** - Comprehensive protection
- **AWS WAF** - If using AWS infrastructure
- **Google Cloud Armor** - If using GCP

### 4. Penetration Testing
Schedule annual penetration testing by:
- Certified ethical hackers (CEH)
- OWASP-certified testers
- Security firms specializing in web applications

---

## 🔗 Resources

### Documentation
- [Firebase Security Best Practices](https://firebase.google.com/docs/rules)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Stripe Security](https://stripe.com/docs/security)
- [Supabase Security](https://supabase.com/docs/guides/auth)

### Tools
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) - Dependency scanning
- [Snyk](https://snyk.io/) - Vulnerability scanning
- [OWASP ZAP](https://www.zaproxy.org/) - Security testing
- [Burp Suite](https://portswigger.net/burp) - Web security testing

---

**Last Updated**: November 24, 2024  
**Version**: 1.0.0  
**Maintained By**: CREOVA Security Team  
**Contact**: security@creova.ca
