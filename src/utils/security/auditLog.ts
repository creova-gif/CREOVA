/**
 * CREOVA Security - Audit Logging System
 * Comprehensive audit trail for security and compliance
 */

import { projectId, publicAnonKey } from '../supabase/info';

export enum AuditEventType {
  // Authentication Events
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGOUT = 'LOGOUT',
  SIGNUP = 'SIGNUP',
  PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST',
  PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS',
  PASSWORD_CHANGE = 'PASSWORD_CHANGE',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
  
  // Payment Events
  PAYMENT_INTENT_CREATED = 'PAYMENT_INTENT_CREATED',
  PAYMENT_ATTEMPT = 'PAYMENT_ATTEMPT',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  SUBSCRIPTION_CREATED = 'SUBSCRIPTION_CREATED',
  SUBSCRIPTION_CANCELLED = 'SUBSCRIPTION_CANCELLED',
  REFUND_REQUESTED = 'REFUND_REQUESTED',
  REFUND_PROCESSED = 'REFUND_PROCESSED',
  
  // Booking & Rental Events
  BOOKING_CREATED = 'BOOKING_CREATED',
  RENTAL_CREATED = 'RENTAL_CREATED',
  SERVICE_INQUIRY = 'SERVICE_INQUIRY',
  COLLABORATION_REQUEST = 'COLLABORATION_REQUEST',
  
  // Data Access Events
  DATA_EXPORT_REQUESTED = 'DATA_EXPORT_REQUESTED',
  DATA_EXPORT_COMPLETED = 'DATA_EXPORT_COMPLETED',
  DATA_DELETION_REQUESTED = 'DATA_DELETION_REQUESTED',
  DATA_DELETION_COMPLETED = 'DATA_DELETION_COMPLETED',
  PROFILE_UPDATED = 'PROFILE_UPDATED',
  
  // Admin Events
  ADMIN_LOGIN = 'ADMIN_LOGIN',
  ADMIN_ACCESS = 'ADMIN_ACCESS',
  ADMIN_REFUND_PROCESSED = 'ADMIN_REFUND_PROCESSED',
  ADMIN_DATA_ACCESS = 'ADMIN_DATA_ACCESS',
  ADMIN_SETTINGS_CHANGED = 'ADMIN_SETTINGS_CHANGED',
  
  // Security Events
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  CAPTCHA_FAILED = 'CAPTCHA_FAILED',
  FRAUD_DETECTED = 'FRAUD_DETECTED',
  INJECTION_ATTEMPT = 'INJECTION_ATTEMPT',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  SESSION_HIJACK_ATTEMPT = 'SESSION_HIJACK_ATTEMPT',
  
  // Cart & Shopping Events
  CART_ITEM_ADDED = 'CART_ITEM_ADDED',
  CHECKOUT_INITIATED = 'CHECKOUT_INITIATED',
  ORDER_PLACED = 'ORDER_PLACED',
  
  // Newsletter & Marketing
  NEWSLETTER_SIGNUP = 'NEWSLETTER_SIGNUP',
  NEWSLETTER_UNSUBSCRIBE = 'NEWSLETTER_UNSUBSCRIBE',
  EMAIL_PREFERENCE_UPDATED = 'EMAIL_PREFERENCE_UPDATED',
  
  // System Events
  API_ERROR = 'API_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR'
}

export enum AuditSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface AuditLog {
  timestamp: string;
  eventType: AuditEventType;
  userId?: string;
  email?: string;
  ip: string;
  userAgent: string;
  details: Record<string, any>;
  severity: AuditSeverity;
  sessionId?: string;
  endpoint?: string;
  statusCode?: number;
}

/**
 * Get client IP address from various sources
 */
function getClientIP(): string {
  // Try to get real IP from headers set by proxy/load balancer
  const headers = [
    'x-forwarded-for',
    'x-real-ip',
    'cf-connecting-ip', // Cloudflare
    'x-client-ip'
  ];
  
  // In browser, we can't access these directly
  // They would be available in server-side code
  return 'client-side'; // Placeholder - real IP would be captured server-side
}

/**
 * Get user agent string
 */
function getUserAgent(): string {
  return typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';
}

/**
 * Determine severity based on event type
 */
function determineSecondarySeverity(eventType: AuditEventType): AuditSeverity {
  const criticalEvents = [
    AuditEventType.FRAUD_DETECTED,
    AuditEventType.INJECTION_ATTEMPT,
    AuditEventType.SESSION_HIJACK_ATTEMPT,
    AuditEventType.ADMIN_REFUND_PROCESSED,
    AuditEventType.DATA_DELETION_COMPLETED
  ];
  
  const highEvents = [
    AuditEventType.SUSPICIOUS_ACTIVITY,
    AuditEventType.UNAUTHORIZED_ACCESS,
    AuditEventType.LOGIN_FAILED,
    AuditEventType.PAYMENT_FAILED,
    AuditEventType.ADMIN_LOGIN,
    AuditEventType.DATA_EXPORT_REQUESTED
  ];
  
  const mediumEvents = [
    AuditEventType.RATE_LIMIT_EXCEEDED,
    AuditEventType.CAPTCHA_FAILED,
    AuditEventType.PASSWORD_RESET_REQUEST,
    AuditEventType.REFUND_REQUESTED,
    AuditEventType.API_ERROR
  ];
  
  if (criticalEvents.includes(eventType)) return AuditSeverity.CRITICAL;
  if (highEvents.includes(eventType)) return AuditSeverity.HIGH;
  if (mediumEvents.includes(eventType)) return AuditSeverity.MEDIUM;
  return AuditSeverity.LOW;
}

/**
 * Log an audit event
 */
export async function logAuditEvent(
  eventType: AuditEventType,
  details: Record<string, any> = {},
  options: {
    userId?: string;
    email?: string;
    severity?: AuditSeverity;
    endpoint?: string;
    statusCode?: number;
  } = {}
): Promise<void> {
  try {
    const log: AuditLog = {
      timestamp: new Date().toISOString(),
      eventType,
      userId: options.userId,
      email: options.email,
      ip: getClientIP(),
      userAgent: getUserAgent(),
      details,
      severity: options.severity || determineSecondarySeverity(eventType),
      endpoint: options.endpoint,
      statusCode: options.statusCode
    };

    // Log to console for immediate visibility
    const emoji = getSeverityEmoji(log.severity);
    console.log(`${emoji} [AUDIT] ${eventType}:`, {
      timestamp: log.timestamp,
      severity: log.severity,
      userId: log.userId,
      email: log.email,
      details: log.details
    });

    // Send to server for persistent storage
    // Only send to server, not client-side storage
    if (typeof window !== 'undefined') {
      try {
        await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-feacf0d8/audit-log`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify(log)
        });
      } catch (error) {
        console.error('Failed to send audit log to server:', error);
      }
    }

    // Send critical alerts
    if (log.severity === AuditSeverity.CRITICAL) {
      await sendSecurityAlert(log);
    }
  } catch (error) {
    console.error('Failed to log audit event:', error);
  }
}

/**
 * Get emoji for severity level
 */
function getSeverityEmoji(severity: AuditSeverity): string {
  switch (severity) {
    case AuditSeverity.CRITICAL: return '🚨';
    case AuditSeverity.HIGH: return '⚠️';
    case AuditSeverity.MEDIUM: return '⚡';
    case AuditSeverity.LOW: return 'ℹ️';
    default: return '📝';
  }
}

/**
 * Send security alert for critical events
 */
async function sendSecurityAlert(log: AuditLog): Promise<void> {
  try {
    console.error('🚨 [CRITICAL SECURITY ALERT]:', {
      event: log.eventType,
      timestamp: log.timestamp,
      details: log.details,
      ip: log.ip,
      userAgent: log.userAgent
    });

    // In production, you would:
    // 1. Send email to security team
    // 2. Send push notification to admin
    // 3. Create incident ticket
    // 4. Trigger automated response (e.g., temporary IP block)
    
    // Example: Send to admin webhook/email service
    await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-feacf0d8/security-alert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({
        alert: 'CRITICAL_SECURITY_EVENT',
        log
      })
    }).catch(err => console.error('Failed to send security alert:', err));
  } catch (error) {
    console.error('Failed to send security alert:', error);
  }
}

/**
 * Shorthand logging functions for common events
 */

export async function logLoginSuccess(userId: string, email: string): Promise<void> {
  await logAuditEvent(AuditEventType.LOGIN_SUCCESS, { method: 'password' }, { userId, email });
}

export async function logLoginFailed(email: string, reason: string): Promise<void> {
  await logAuditEvent(AuditEventType.LOGIN_FAILED, { email, reason }, { email, severity: AuditSeverity.HIGH });
}

export async function logSignup(userId: string, email: string): Promise<void> {
  await logAuditEvent(AuditEventType.SIGNUP, {}, { userId, email });
}

export async function logPaymentSuccess(userId: string, amount: number, currency: string, paymentIntentId: string): Promise<void> {
  await logAuditEvent(AuditEventType.PAYMENT_SUCCESS, {
    amount,
    currency,
    paymentIntentId
  }, { userId });
}

export async function logPaymentFailed(userId: string, amount: number, reason: string): Promise<void> {
  await logAuditEvent(AuditEventType.PAYMENT_FAILED, {
    amount,
    reason
  }, { userId, severity: AuditSeverity.MEDIUM });
}

export async function logSuspiciousActivity(reason: string, details: Record<string, any> = {}): Promise<void> {
  await logAuditEvent(AuditEventType.SUSPICIOUS_ACTIVITY, {
    reason,
    ...details
  }, { severity: AuditSeverity.HIGH });
}

export async function logRateLimitExceeded(endpoint: string, ip: string): Promise<void> {
  await logAuditEvent(AuditEventType.RATE_LIMIT_EXCEEDED, {
    endpoint,
    clientIp: ip
  }, { severity: AuditSeverity.MEDIUM });
}

export async function logFraudDetected(userId: string | undefined, reason: string, score: number): Promise<void> {
  await logAuditEvent(AuditEventType.FRAUD_DETECTED, {
    reason,
    fraudScore: score
  }, { userId, severity: AuditSeverity.CRITICAL });
}

export async function logInjectionAttempt(input: string, endpoint: string): Promise<void> {
  await logAuditEvent(AuditEventType.INJECTION_ATTEMPT, {
    suspiciousInput: input.substring(0, 200), // Log first 200 chars only
    endpoint
  }, { severity: AuditSeverity.CRITICAL });
}

export async function logAdminAccess(userId: string, action: string, targetResource?: string): Promise<void> {
  await logAuditEvent(AuditEventType.ADMIN_ACCESS, {
    action,
    targetResource
  }, { userId, severity: AuditSeverity.HIGH });
}

export async function logAPIError(endpoint: string, error: any, statusCode: number): Promise<void> {
  await logAuditEvent(AuditEventType.API_ERROR, {
    endpoint,
    error: error.message || String(error),
    stack: error.stack?.substring(0, 500)
  }, { endpoint, statusCode, severity: AuditSeverity.MEDIUM });
}

/**
 * Create a session-specific logger
 */
export class SessionLogger {
  private sessionId: string;
  private userId?: string;
  private email?: string;

  constructor(sessionId: string, userId?: string, email?: string) {
    this.sessionId = sessionId;
    this.userId = userId;
    this.email = email;
  }

  async log(eventType: AuditEventType, details: Record<string, any> = {}): Promise<void> {
    await logAuditEvent(eventType, {
      ...details,
      sessionId: this.sessionId
    }, {
      userId: this.userId,
      email: this.email
    });
  }

  async logSuccess(message: string, details: Record<string, any> = {}): Promise<void> {
    console.log(`✅ [Session ${this.sessionId}] ${message}`, details);
  }

  async logError(message: string, error: any, details: Record<string, any> = {}): Promise<void> {
    console.error(`❌ [Session ${this.sessionId}] ${message}`, { error, ...details });
  }

  async logWarning(message: string, details: Record<string, any> = {}): Promise<void> {
    console.warn(`⚠️ [Session ${this.sessionId}] ${message}`, details);
  }
}

/**
 * Export audit logs (admin only - would be server-side in production)
 */
export async function exportAuditLogs(
  startDate: string,
  endDate: string,
  eventTypes?: AuditEventType[]
): Promise<void> {
  try {
    const params = new URLSearchParams({
      startDate,
      endDate,
      ...(eventTypes && { eventTypes: eventTypes.join(',') })
    });

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-feacf0d8/audit-logs/export?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to export audit logs');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${startDate}-to-${endDate}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export audit logs:', error);
    throw error;
  }
}
