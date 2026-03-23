/**
 * CREOVA Advanced Protection System
 * Maximum security against insider threats, physical access, and nearby attackers
 */

import { logSuspiciousActivity, AuditEventType, logAuditEvent } from './auditLog';

// ============================================================================
// DEVICE FINGERPRINTING - Detect device changes
// ============================================================================

export interface DeviceFingerprint {
  id: string;
  userAgent: string;
  platform: string;
  language: string;
  timezone: string;
  screenResolution: string;
  colorDepth: number;
  hardwareConcurrency: number;
  deviceMemory?: number;
  touchSupport: boolean;
  fonts: string[];
  canvas: string;
  webgl: string;
  plugins: string[];
}

/**
 * Generate comprehensive device fingerprint
 */
export async function generateDeviceFingerprint(): Promise<DeviceFingerprint> {
  const canvas = await getCanvasFingerprint();
  const webgl = await getWebGLFingerprint();
  const fonts = await detectFonts();
  const plugins = getPlugins();

  const fingerprint: DeviceFingerprint = {
    id: '', // Will be set after hashing
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screenResolution: `${screen.width}x${screen.height}x${screen.colorDepth}`,
    colorDepth: screen.colorDepth,
    hardwareConcurrency: navigator.hardwareConcurrency || 0,
    deviceMemory: (navigator as any).deviceMemory,
    touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    fonts,
    canvas,
    webgl,
    plugins
  };

  // Generate unique ID from fingerprint
  fingerprint.id = await hashFingerprint(fingerprint);
  return fingerprint;
}

/**
 * Canvas fingerprinting
 */
async function getCanvasFingerprint(): Promise<string> {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return 'no-canvas';

    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(0, 0, 125, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('CREOVA Security 🔒', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('Device Fingerprint', 4, 17);

    return canvas.toDataURL().slice(-50); // Last 50 chars for uniqueness
  } catch {
    return 'canvas-error';
  }
}

/**
 * WebGL fingerprinting
 */
async function getWebGLFingerprint(): Promise<string> {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    
    if (!gl) return 'no-webgl';

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return 'no-debug-info';

    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

    return `${vendor}|${renderer}`.substring(0, 50);
  } catch {
    return 'webgl-error';
  }
}

/**
 * Detect installed fonts
 */
async function detectFonts(): Promise<string[]> {
  const baseFonts = ['monospace', 'sans-serif', 'serif'];
  const testFonts = [
    'Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia',
    'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact'
  ];

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return [];

  const detected: string[] = [];

  for (const font of testFonts) {
    let detected_font = false;
    for (const baseFont of baseFonts) {
      ctx.font = `72px ${baseFont}`;
      const baseWidth = ctx.measureText('mmmmmmmmmmlli').width;
      
      ctx.font = `72px ${font}, ${baseFont}`;
      const testWidth = ctx.measureText('mmmmmmmmmmlli').width;
      
      if (baseWidth !== testWidth) {
        detected_font = true;
        break;
      }
    }
    if (detected_font) {
      detected.push(font);
    }
  }

  return detected;
}

/**
 * Get browser plugins
 */
function getPlugins(): string[] {
  const plugins: string[] = [];
  for (let i = 0; i < navigator.plugins.length; i++) {
    plugins.push(navigator.plugins[i].name);
  }
  return plugins.slice(0, 10); // Limit to 10 for performance
}

/**
 * Hash fingerprint data
 */
async function hashFingerprint(fingerprint: DeviceFingerprint): Promise<string> {
  const data = JSON.stringify({
    userAgent: fingerprint.userAgent,
    platform: fingerprint.platform,
    screenResolution: fingerprint.screenResolution,
    timezone: fingerprint.timezone,
    canvas: fingerprint.canvas,
    webgl: fingerprint.webgl,
    fonts: fingerprint.fonts.join(','),
    plugins: fingerprint.plugins.join(',')
  });

  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ============================================================================
// LOCATION & NETWORK TRACKING
// ============================================================================

export interface LocationInfo {
  ip: string;
  country?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  isp?: string;
  isVPN: boolean;
  isProxy: boolean;
  isTor: boolean;
}

/**
 * Get geolocation (requires user permission)
 */
export async function getGeolocation(): Promise<{lat: number, lon: number} | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        console.warn('Geolocation denied:', error);
        resolve(null);
      },
      { timeout: 5000 }
    );
  });
}

/**
 * Check if location has changed significantly
 */
export function hasLocationChanged(
  oldLat: number,
  oldLon: number,
  newLat: number,
  newLon: number,
  thresholdKm: number = 50
): boolean {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(newLat - oldLat);
  const dLon = toRad(newLon - oldLon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(oldLat)) * Math.cos(toRad(newLat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance > thresholdKm;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// ============================================================================
// SESSION SECURITY
// ============================================================================

export interface SecureSession {
  sessionId: string;
  userId: string;
  deviceFingerprint: string;
  ipAddress: string;
  location?: { lat: number; lon: number };
  createdAt: number;
  lastActivity: number;
  activityCount: number;
  trusted: boolean;
}

class SessionSecurityManager {
  private static instance: SessionSecurityManager;
  private currentSession: SecureSession | null = null;
  private inactivityTimer: NodeJS.Timeout | null = null;
  private readonly INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes
  private readonly MAX_SESSION_DURATION = 12 * 60 * 60 * 1000; // 12 hours

  static getInstance(): SessionSecurityManager {
    if (!SessionSecurityManager.instance) {
      SessionSecurityManager.instance = new SessionSecurityManager();
    }
    return SessionSecurityManager.instance;
  }

  /**
   * Initialize secure session
   */
  async initializeSession(userId: string, sessionId: string): Promise<SecureSession> {
    const fingerprint = await generateDeviceFingerprint();
    const location = await getGeolocation();

    this.currentSession = {
      sessionId,
      userId,
      deviceFingerprint: fingerprint.id,
      ipAddress: 'client-side', // Would be set server-side
      location: location || undefined,
      createdAt: Date.now(),
      lastActivity: Date.now(),
      activityCount: 0,
      trusted: false
    };

    // Store in sessionStorage (not localStorage for security)
    sessionStorage.setItem('secure_session', JSON.stringify(this.currentSession));

    // Start monitoring
    this.startActivityMonitoring();
    
    await logAuditEvent(AuditEventType.LOGIN_SUCCESS, {
      deviceFingerprint: fingerprint.id,
      location: location ? `${location.lat},${location.lon}` : 'unknown'
    }, { userId });

    return this.currentSession;
  }

  /**
   * Verify session integrity
   */
  async verifySession(): Promise<{valid: boolean; reason?: string}> {
    if (!this.currentSession) {
      return { valid: false, reason: 'No active session' };
    }

    // Check session timeout
    const sessionAge = Date.now() - this.currentSession.createdAt;
    if (sessionAge > this.MAX_SESSION_DURATION) {
      await this.terminateSession('Session expired');
      return { valid: false, reason: 'Session expired (max duration exceeded)' };
    }

    // Check inactivity
    const inactivity = Date.now() - this.currentSession.lastActivity;
    if (inactivity > this.INACTIVITY_TIMEOUT) {
      await this.terminateSession('Inactivity timeout');
      return { valid: false, reason: 'Session expired (inactivity)' };
    }

    // Verify device fingerprint
    const currentFingerprint = await generateDeviceFingerprint();
    if (currentFingerprint.id !== this.currentSession.deviceFingerprint) {
      await logSuspiciousActivity('Device fingerprint mismatch', {
        expected: this.currentSession.deviceFingerprint,
        actual: currentFingerprint.id,
        userId: this.currentSession.userId
      });
      await this.terminateSession('Device fingerprint mismatch');
      return { valid: false, reason: 'Device changed - security violation' };
    }

    // Check location if available
    if (this.currentSession.location) {
      const currentLocation = await getGeolocation();
      if (currentLocation) {
        const locationChanged = hasLocationChanged(
          this.currentSession.location.lat,
          this.currentSession.location.lon,
          currentLocation.lat,
          currentLocation.lon,
          100 // 100km threshold
        );

        if (locationChanged) {
          await logSuspiciousActivity('Significant location change detected', {
            oldLocation: this.currentSession.location,
            newLocation: currentLocation,
            userId: this.currentSession.userId
          });
          // Don't terminate, but flag as suspicious
          this.currentSession.trusted = false;
        }
      }
    }

    return { valid: true };
  }

  /**
   * Update session activity
   */
  async updateActivity(): Promise<void> {
    if (!this.currentSession) return;

    this.currentSession.lastActivity = Date.now();
    this.currentSession.activityCount++;

    // Update sessionStorage
    sessionStorage.setItem('secure_session', JSON.stringify(this.currentSession));

    // Reset inactivity timer
    this.resetInactivityTimer();
  }

  /**
   * Start monitoring user activity
   */
  private startActivityMonitoring(): void {
    // Monitor mouse movement
    document.addEventListener('mousemove', this.handleActivity);
    
    // Monitor keyboard
    document.addEventListener('keydown', this.handleActivity);
    
    // Monitor clicks
    document.addEventListener('click', this.handleActivity);
    
    // Monitor scrolling
    document.addEventListener('scroll', this.handleActivity);

    // Monitor visibility changes
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

    // Start inactivity timer
    this.resetInactivityTimer();
  }

  private handleActivity = async () => {
    await this.updateActivity();
  };

  private handleVisibilityChange = async () => {
    if (document.hidden) {
      console.log('🔒 Page hidden - pausing activity monitoring');
    } else {
      console.log('👁️ Page visible - resuming activity monitoring');
      await this.updateActivity();
    }
  };

  private resetInactivityTimer(): void {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }

    this.inactivityTimer = setTimeout(async () => {
      await this.terminateSession('Inactivity timeout');
      window.location.href = '/auth?reason=timeout';
    }, this.INACTIVITY_TIMEOUT);
  }

  /**
   * Terminate session
   */
  async terminateSession(reason: string): Promise<void> {
    if (this.currentSession) {
      await logAuditEvent(AuditEventType.LOGOUT, {
        reason,
        sessionDuration: Date.now() - this.currentSession.createdAt,
        activityCount: this.currentSession.activityCount
      }, { userId: this.currentSession.userId });
    }

    // Clear session
    sessionStorage.removeItem('secure_session');
    this.currentSession = null;

    // Clear timers
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = null;
    }

    // Remove event listeners
    document.removeEventListener('mousemove', this.handleActivity);
    document.removeEventListener('keydown', this.handleActivity);
    document.removeEventListener('click', this.handleActivity);
    document.removeEventListener('scroll', this.handleActivity);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  /**
   * Get current session
   */
  getCurrentSession(): SecureSession | null {
    return this.currentSession;
  }
}

export const sessionSecurity = SessionSecurityManager.getInstance();

// ============================================================================
// CLIPBOARD & SCREEN PROTECTION
// ============================================================================

/**
 * Disable clipboard operations on sensitive fields
 */
export function protectSensitiveField(element: HTMLInputElement): void {
  // Disable copy/paste
  element.addEventListener('copy', (e) => {
    e.preventDefault();
    console.warn('🔒 Copy disabled on sensitive field');
  });

  element.addEventListener('paste', (e) => {
    e.preventDefault();
    console.warn('🔒 Paste disabled on sensitive field');
  });

  element.addEventListener('cut', (e) => {
    e.preventDefault();
    console.warn('🔒 Cut disabled on sensitive field');
  });

  // Disable drag
  element.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });

  // Disable context menu
  element.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // Add autocomplete off
  element.setAttribute('autocomplete', 'off');
  element.setAttribute('data-protected', 'true');
}

/**
 * Detect screenshot attempts (limited browser support)
 */
export function monitorScreenCapture(): void {
  // Detect when window loses focus (potential screenshot)
  window.addEventListener('blur', () => {
    console.warn('⚠️ Window lost focus - potential screenshot');
    logSuspiciousActivity('Window focus lost', {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
  });

  // Detect print screen (very limited)
  document.addEventListener('keyup', (e) => {
    if (e.key === 'PrintScreen') {
      logSuspiciousActivity('Print screen key detected', {
        timestamp: new Date().toISOString()
      });
    }
  });

  // Detect dev tools (F12, Ctrl+Shift+I, etc.)
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
      (e.ctrlKey && e.key === 'U')
    ) {
      logSuspiciousActivity('Developer tools access attempt', {
        key: e.key,
        ctrl: e.ctrlKey,
        shift: e.shiftKey
      });
    }
  });
}

/**
 * Add watermark to prevent screenshots
 */
export function addSecurityWatermark(userId: string): void {
  const watermark = document.createElement('div');
  watermark.id = 'security-watermark';
  watermark.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 80px;
    color: rgba(0, 0, 0, 0.03);
    pointer-events: none;
    user-select: none;
    z-index: 9999;
    white-space: nowrap;
    font-family: monospace;
  `;
  watermark.textContent = `CREOVA • ${userId} • ${new Date().toISOString()}`;
  document.body.appendChild(watermark);
}

// ============================================================================
// NETWORK SECURITY
// ============================================================================

/**
 * Detect if user is on insecure network
 */
export async function checkNetworkSecurity(): Promise<{secure: boolean; warnings: string[]}> {
  const warnings: string[] = [];

  // Check if using HTTPS
  if (window.location.protocol !== 'https:') {
    warnings.push('Not using HTTPS - connection is not secure');
  }

  // Check for mixed content
  if (document.querySelector('script[src^="http:"]') || 
      document.querySelector('link[href^="http:"]')) {
    warnings.push('Mixed content detected - some resources loaded over HTTP');
  }

  // Check for secure context
  if (!window.isSecureContext) {
    warnings.push('Not in secure context - some features may be disabled');
  }

  return {
    secure: warnings.length === 0,
    warnings
  };
}

/**
 * Monitor network requests for suspicious activity
 */
export function monitorNetworkRequests(): void {
  // Intercept fetch
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const [url] = args;
    const urlString = typeof url === 'string' ? url : url.toString();

    // Check for suspicious domains
    if (urlString.includes('localhost') && window.location.hostname !== 'localhost') {
      logSuspiciousActivity('Suspicious fetch to localhost', { url: urlString });
    }

    // Check for non-HTTPS in production
    if (window.location.protocol === 'https:' && urlString.startsWith('http:')) {
      logSuspiciousActivity('Insecure fetch attempt', { url: urlString });
    }

    return originalFetch.apply(window, args);
  };
}

// ============================================================================
// CONCURRENT SESSION DETECTION
// ============================================================================

export class ConcurrentSessionMonitor {
  private static instance: ConcurrentSessionMonitor;
  private channel: BroadcastChannel | null = null;
  private sessionId: string;

  constructor() {
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    if ('BroadcastChannel' in window) {
      this.channel = new BroadcastChannel('creova_sessions');
      this.setupListeners();
      this.announceSession();
    }
  }

  static getInstance(): ConcurrentSessionMonitor {
    if (!ConcurrentSessionMonitor.instance) {
      ConcurrentSessionMonitor.instance = new ConcurrentSessionMonitor();
    }
    return ConcurrentSessionMonitor.instance;
  }

  private setupListeners(): void {
    if (!this.channel) return;

    this.channel.addEventListener('message', async (event) => {
      if (event.data.type === 'new_session' && event.data.sessionId !== this.sessionId) {
        // Another session detected
        await logSuspiciousActivity('Concurrent session detected', {
          currentSession: this.sessionId,
          newSession: event.data.sessionId,
          timestamp: event.data.timestamp
        });

        // Optionally force logout
        if (confirm('⚠️ Another session detected. For security, we recommend logging out other sessions. Continue?')) {
          // User chose to continue
          console.warn('User opted to continue with concurrent session');
        } else {
          // Force logout
          window.location.href = '/auth?reason=concurrent_session';
        }
      }
    });
  }

  private announceSession(): void {
    if (!this.channel) return;

    this.channel.postMessage({
      type: 'new_session',
      sessionId: this.sessionId,
      timestamp: Date.now()
    });
  }

  destroy(): void {
    if (this.channel) {
      this.channel.close();
    }
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize all advanced protection features
 */
export async function initializeAdvancedProtection(userId: string): Promise<void> {
  console.log('🛡️ Initializing advanced protection systems...');

  // 1. Check network security
  const networkCheck = await checkNetworkSecurity();
  if (!networkCheck.secure) {
    console.warn('⚠️ Network security warnings:', networkCheck.warnings);
    networkCheck.warnings.forEach(warning => {
      console.warn(`  - ${warning}`);
    });
  }

  // 2. Monitor network requests
  monitorNetworkRequests();

  // 3. Monitor screen capture attempts
  monitorScreenCapture();

  // 4. Initialize concurrent session monitor
  ConcurrentSessionMonitor.getInstance();

  // 5. Add security watermark (optional - can be intrusive)
  // addSecurityWatermark(userId);

  console.log('✅ Advanced protection systems active');
}

/**
 * Protect admin pages
 */
export function protectAdminPage(): void {
  // Disable right-click
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    console.warn('🔒 Right-click disabled on admin page');
  });

  // Disable F12 and dev tools
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && e.key === 'I') ||
      (e.ctrlKey && e.shiftKey && e.key === 'J') ||
      (e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault();
      console.warn('🔒 Developer tools access blocked');
    }
  });

  // Disable text selection
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';

  console.log('🔒 Admin page protection enabled');
}
