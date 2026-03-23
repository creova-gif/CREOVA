/**
 * CREOVA Security - Input Sanitization Utilities
 * Comprehensive input sanitization to prevent XSS, SQL injection, and other attacks
 */

/**
 * Remove HTML tags and scripts to prevent XSS
 */
export function sanitizeHtml(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  return input
    // Remove script tags and their content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove all HTML tags
    .replace(/<[^>]+>/g, '')
    // Remove HTML entities that could be used for XSS
    .replace(/&[#\w]+;/g, '')
    .trim();
}

/**
 * Sanitize SQL-like patterns (defense in depth - Supabase handles this, but good practice)
 */
export function sanitizeSQL(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|SCRIPT|DECLARE|CAST|CONVERT)\b)/gi,
    /(--|#|\/\*|\*\/|;)/g,
    /('|(\\')|(\\x27)|(\\u0027)|(\\x2527))/g,
    /(\bOR\b.*=.*|AND\b.*=.*)/gi
  ];
  
  let sanitized = input;
  sqlPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });
  
  return sanitized.trim();
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') return '';
  
  return email
    .toLowerCase()
    .replace(/[^a-z0-9@._+-]/g, '')
    .trim()
    .substring(0, 254); // RFC 5321 max length
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize phone number (Canadian format)
 */
export function sanitizePhone(phone: string): string {
  if (!phone || typeof phone !== 'string') return '';
  
  return phone
    .replace(/[^\d+()-\s]/g, '')
    .trim()
    .substring(0, 20); // Reasonable max length for international numbers
}

/**
 * Sanitize name (allow unicode for international names)
 */
export function sanitizeName(name: string): string {
  if (!name || typeof name !== 'string') return '';
  
  return name
    // Remove dangerous characters
    .replace(/[<>{}[\]\\]/g, '')
    // Remove excessive whitespace
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 100); // Max 100 characters
}

/**
 * Sanitize general text input
 */
export function sanitizeText(text: string, maxLength: number = 1000): string {
  if (!text || typeof text !== 'string') return '';
  
  return sanitizeHtml(text)
    .replace(/\s+/g, ' ') // Normalize whitespace
    .substring(0, maxLength)
    .trim();
}

/**
 * Sanitize and validate URL
 */
export function sanitizeUrl(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  
  try {
    const parsed = new URL(url);
    // Only allow http/https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null;
    }
    // Prevent javascript: and data: URLs
    if (parsed.protocol === 'javascript:' || parsed.protocol === 'data:') {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

/**
 * Sanitize address (for shipping/billing)
 */
export function sanitizeAddress(address: string): string {
  if (!address || typeof address !== 'string') return '';
  
  return address
    .replace(/[<>{}[\]\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 200);
}

/**
 * Sanitize postal code (Canadian format)
 */
export function sanitizePostalCode(postalCode: string): string {
  if (!postalCode || typeof postalCode !== 'string') return '';
  
  return postalCode
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .trim()
    .substring(0, 10);
}

/**
 * Validate Canadian postal code format
 */
export function isValidCanadianPostalCode(postalCode: string): boolean {
  const canadianPostalCodeRegex = /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i;
  return canadianPostalCodeRegex.test(postalCode);
}

/**
 * Sanitize credit card number (for logging - never store!)
 */
export function maskCreditCard(cardNumber: string): string {
  if (!cardNumber || typeof cardNumber !== 'string') return '';
  
  const cleaned = cardNumber.replace(/\D/g, '');
  if (cleaned.length < 4) return '****';
  
  const lastFour = cleaned.slice(-4);
  return `****-****-****-${lastFour}`;
}

/**
 * Sanitize numeric input
 */
export function sanitizeNumber(input: string | number): number | null {
  if (typeof input === 'number') {
    return isFinite(input) ? input : null;
  }
  
  if (typeof input === 'string') {
    const cleaned = input.replace(/[^\d.-]/g, '');
    const num = parseFloat(cleaned);
    return isFinite(num) ? num : null;
  }
  
  return null;
}

/**
 * Sanitize amount (for prices, payments)
 */
export function sanitizeAmount(amount: string | number): number | null {
  const num = sanitizeNumber(amount);
  if (num === null || num < 0) return null;
  
  // Round to 2 decimal places
  return Math.round(num * 100) / 100;
}

/**
 * Comprehensive sanitization for form data
 */
export function sanitizeFormData(data: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) {
      sanitized[key] = value;
      continue;
    }
    
    if (typeof value === 'string') {
      const lowerKey = key.toLowerCase();
      
      // Detect field type and apply appropriate sanitization
      if (lowerKey.includes('email')) {
        sanitized[key] = sanitizeEmail(value);
      } else if (lowerKey.includes('phone') || lowerKey.includes('tel')) {
        sanitized[key] = sanitizePhone(value);
      } else if (lowerKey.includes('name') || lowerKey === 'first_name' || lowerKey === 'last_name') {
        sanitized[key] = sanitizeName(value);
      } else if (lowerKey.includes('url') || lowerKey.includes('link') || lowerKey.includes('website')) {
        sanitized[key] = sanitizeUrl(value);
      } else if (lowerKey.includes('address') || lowerKey.includes('street') || lowerKey.includes('city')) {
        sanitized[key] = sanitizeAddress(value);
      } else if (lowerKey.includes('postal') || lowerKey.includes('zip')) {
        sanitized[key] = sanitizePostalCode(value);
      } else if (lowerKey.includes('amount') || lowerKey.includes('price') || lowerKey.includes('total')) {
        sanitized[key] = sanitizeAmount(value);
      } else {
        sanitized[key] = sanitizeText(value);
      }
    } else if (typeof value === 'number') {
      sanitized[key] = sanitizeNumber(value);
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      // Recursively sanitize nested objects
      sanitized[key] = sanitizeFormData(value);
    } else {
      // For arrays and other types, pass through
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

/**
 * Validate and sanitize CAPTCHA token
 */
export function sanitizeCaptchaToken(token: string): string | null {
  if (!token || typeof token !== 'string') return null;
  
  // CAPTCHA tokens are alphanumeric with hyphens and underscores
  const cleaned = token.replace(/[^a-zA-Z0-9_-]/g, '');
  
  // Reasonable token length (reCAPTCHA tokens are typically 500-2000 chars)
  if (cleaned.length < 100 || cleaned.length > 3000) {
    return null;
  }
  
  return cleaned;
}

/**
 * Sanitize user agent string
 */
export function sanitizeUserAgent(userAgent: string): string {
  if (!userAgent || typeof userAgent !== 'string') return 'Unknown';
  
  return userAgent
    .replace(/[<>{}[\]\\]/g, '')
    .substring(0, 500)
    .trim();
}

/**
 * Sanitize IP address
 */
export function sanitizeIP(ip: string): string | null {
  if (!ip || typeof ip !== 'string') return null;
  
  // IPv4 validation
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  // IPv6 validation (simplified)
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  
  const cleaned = ip.trim();
  
  if (ipv4Regex.test(cleaned)) {
    // Validate each octet is 0-255
    const octets = cleaned.split('.');
    if (octets.every(octet => parseInt(octet) >= 0 && parseInt(octet) <= 255)) {
      return cleaned;
    }
  }
  
  if (ipv6Regex.test(cleaned)) {
    return cleaned;
  }
  
  return null;
}

/**
 * Remove potentially dangerous file extensions
 */
export function sanitizeFilename(filename: string): string {
  if (!filename || typeof filename !== 'string') return '';
  
  // Remove path traversal attempts
  let safe = filename.replace(/\.\./g, '').replace(/[\/\\]/g, '');
  
  // Remove dangerous extensions
  const dangerousExtensions = [
    '.exe', '.bat', '.cmd', '.sh', '.ps1', '.vbs', '.js', '.jar',
    '.app', '.deb', '.rpm', '.dmg', '.pkg'
  ];
  
  dangerousExtensions.forEach(ext => {
    if (safe.toLowerCase().endsWith(ext)) {
      safe = safe.substring(0, safe.length - ext.length);
    }
  });
  
  return safe
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .substring(0, 255);
}

/**
 * Detect and block common injection patterns
 */
export function detectInjection(input: string): boolean {
  if (!input || typeof input !== 'string') return false;
  
  const injectionPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // Event handlers like onclick=
    /eval\(/i,
    /expression\(/i,
    /vbscript:/i,
    /data:text\/html/i,
    /<iframe/i,
    /<embed/i,
    /<object/i,
    /\bUNION\b.*\bSELECT\b/i,
    /\bDROP\b.*\bTABLE\b/i,
    /\bEXEC\b.*\(/i
  ];
  
  return injectionPatterns.some(pattern => pattern.test(input));
}

/**
 * Rate limit key sanitization (for IP or user IDs)
 */
export function sanitizeRateLimitKey(key: string): string {
  if (!key || typeof key !== 'string') return 'unknown';
  
  return key
    .replace(/[^a-zA-Z0-9.:_-]/g, '')
    .substring(0, 100);
}
