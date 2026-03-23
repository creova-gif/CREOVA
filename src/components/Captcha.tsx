import { useEffect, useRef, useState } from 'react';
import { logger } from '../utils/logger';

// CAPTCHA component using Google reCAPTCHA v2
// Using production keys for live deployment

interface CaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (error: string) => void;
  siteKey?: string;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'compact' | 'invisible';
}

// Global flag to track if script is loaded
let isScriptLoaded = false;
let isScriptLoading = false;
const scriptCallbacks: (() => void)[] = [];

export function Captcha({
  onVerify,
  onExpire,
  onError,
  siteKey = '6LfzJBAsAAAAAKSOz2kKYT4XjCkITC9N3-E1zeg6', // Production site key
  theme = 'light',
  size = 'normal'
}: CaptchaProps) {
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [scriptReady, setScriptReady] = useState(isScriptLoaded);
  const errorHandledRef = useRef(false); // Track if error was already handled
  const isMountedRef = useRef(true); // Track if component is mounted

  useEffect(() => {
    // Reset error flag on mount
    errorHandledRef.current = false;
    isMountedRef.current = true;
    
    // If already loaded, just set ready
    if (isScriptLoaded && window.grecaptcha && window.grecaptcha.render) {
      setScriptReady(true);
      return;
    }

    // If currently loading, add callback
    if (isScriptLoading) {
      const callback = () => {
        if (isMountedRef.current) {
          setScriptReady(true);
        }
      };
      scriptCallbacks.push(callback);
      return () => {
        isMountedRef.current = false;
        const index = scriptCallbacks.indexOf(callback);
        if (index > -1) scriptCallbacks.splice(index, 1);
      };
    }

    // Check if script element already exists
    const existingScript = document.querySelector('script[src*="recaptcha/api.js"]');
    if (existingScript) {
      isScriptLoading = true;
      const callback = () => {
        if (isMountedRef.current) {
          setScriptReady(true);
        }
      };
      scriptCallbacks.push(callback);
      return () => {
        isMountedRef.current = false;
        const index = scriptCallbacks.indexOf(callback);
        if (index > -1) scriptCallbacks.splice(index, 1);
      };
    }

    // Load reCAPTCHA script
    isScriptLoading = true;
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    
    let checkInterval: NodeJS.Timeout | null = null;
    
    script.onload = () => {
      // Wait a bit for grecaptcha to be fully ready with timeout
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds total
      checkInterval = setInterval(() => {
        attempts++;
        if (window.grecaptcha && window.grecaptcha.render) {
          if (checkInterval) clearInterval(checkInterval);
          isScriptLoaded = true;
          isScriptLoading = false;
          if (isMountedRef.current) {
            setScriptReady(true);
          }
          // Execute all callbacks
          scriptCallbacks.forEach(cb => cb());
          scriptCallbacks.length = 0;
        } else if (attempts >= maxAttempts) {
          if (checkInterval) clearInterval(checkInterval);
          isScriptLoading = false;
          console.error('reCAPTCHA failed to initialize after timeout');
          // Don't call onError here - it's too aggressive
        }
      }, 100);
    };

    script.onerror = () => {
      console.error('Failed to load reCAPTCHA script');
      isScriptLoading = false;
      if (checkInterval) clearInterval(checkInterval);
      // Don't call onError here - will be handled on render attempt
    };

    document.body.appendChild(script);

    return () => {
      isMountedRef.current = false;
      // Clear the interval if it's still running
      if (checkInterval) {
        clearInterval(checkInterval);
      }
      // Cleanup widget on unmount
      if (widgetIdRef.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch (e) {
          console.debug('Error resetting reCAPTCHA:', e);
        }
      }
    };
  }, []);

  useEffect(() => {
    // Render the widget when script is ready
    if (scriptReady && captchaRef.current && window.grecaptcha && widgetIdRef.current === null) {
      try {
        widgetIdRef.current = window.grecaptcha.render(captchaRef.current, {
          sitekey: siteKey,
          theme: theme,
          size: size,
          callback: (token: string) => {
            logger.log('reCAPTCHA verified successfully');
            errorHandledRef.current = false; // Reset error flag on success
            onVerify(token);
          },
          'expired-callback': () => {
            logger.log('reCAPTCHA expired');
            if (onExpire) onExpire();
          },
          'error-callback': (error: any) => {
            // Only handle error once to avoid duplicate toasts
            if (errorHandledRef.current) {
              console.debug('reCAPTCHA error already handled, skipping duplicate');
              return;
            }
            
            errorHandledRef.current = true;
            
            // Log for debugging but don't show error to user unless it's meaningful
            console.debug('reCAPTCHA error callback triggered. Error value:', error, 'Type:', typeof error);
            
            // Only show error to user if there's a real error
            // Undefined/null/empty errors are often false positives from Google's error detection
            if (error !== undefined && error !== null && error !== '') {
              const errorMessage = String(error);
              console.error('reCAPTCHA error:', errorMessage);
              if (onError) onError(errorMessage);
            } else {
              // Silent error - likely a false positive, just log it
              console.debug('reCAPTCHA encountered a non-critical error (likely false positive)');
              // Don't call onError - user can still try to complete CAPTCHA
            }
          },
        });
        logger.log('reCAPTCHA widget rendered successfully with ID:', widgetIdRef.current);
      } catch (e) {
        console.error('Error rendering reCAPTCHA:', e);
        const errorMessage = e instanceof Error ? e.message : 'Failed to render reCAPTCHA. Please refresh the page.';
        if (onError && !errorHandledRef.current) {
          errorHandledRef.current = true;
          onError(errorMessage);
        }
      }
    }
  }, [scriptReady, siteKey, theme, size, onVerify, onExpire, onError]);

  return (
    <div className="flex justify-center">
      <div ref={captchaRef} />
    </div>
  );
}

// Type declarations for Google reCAPTCHA
declare global {
  interface Window {
    grecaptcha: {
      render: (container: HTMLElement, config: any) => number;
      reset: (widgetId: number) => void;
      execute: (widgetId: number) => void;
      getResponse: (widgetId: number) => string;
    };
    recaptchaOnLoad: () => void;
  }
}