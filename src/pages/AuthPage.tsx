import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Card } from '../components/ui/card';
import { Captcha } from '../components/Captcha';
import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Sparkles, Users, Smartphone, Palette, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { logger } from '../utils/logger';

type AuthMode = 'login' | 'signup';

export function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 8) return { strength: 25, label: 'Weak', color: '#DC2626' };
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^A-Za-z0-9]/.test(password)) strength += 12.5;
    
    if (strength < 50) return { strength, label: 'Weak', color: '#DC2626' };
    if (strength < 75) return { strength, label: 'Good', color: '#F59E0B' };
    return { strength, label: 'Strong', color: '#10B981' };
  };

  const passwordStrength = mode === 'signup' ? getPasswordStrength(formData.password) : null;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    logger.log('CAPTCHA verified successfully');
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken(null);
    logger.log('CAPTCHA expired, please verify again');
    toast.error('Security verification expired. Please verify again.');
  };

  const handleCaptchaError = (error: string) => {
    setCaptchaToken(null);
    console.error('CAPTCHA error:', error);
    toast.error('Security Verification Issue', {
      description: error || 'Unable to verify. Please refresh and try again.'
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (mode === 'signup') {
      if (!formData.name) {
        toast.error('Please enter your name');
        return false;
      }

      if (formData.password.length < 8) {
        toast.error('Password must be at least 8 characters long');
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return false;
      }

      if (!agreedToTerms) {
        toast.error('Please agree to the Terms of Service and Privacy Policy');
        return false;
      }
    }

    // CAPTCHA validation
    if (!captchaToken) {
      toast.error('Please complete the CAPTCHA verification');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
          emailRedirectTo: window.location.origin + '/auth/callback'
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        toast.error('Sign up failed: ' + error.message);
        return;
      }

      if (data.user) {
        toast.success('Welcome to the CREOVA family! Check your email to verify your account and activate your Community membership.');
        setMode('login');
        setFormData({ name: '', email: formData.email, password: '', confirmPassword: '' });
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error('An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error('Login error:', error);
        toast.error('Login failed: ' + error.message);
        return;
      }

      if (data.session) {
        toast.success('Welcome back!');
        // Redirect to memberships or dashboard
        navigate('/memberships');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'facebook' | 'github' | 'apple') => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.location.origin + '/auth/callback'
        }
      });

      if (error) {
        console.error('OAuth error:', error);
        toast.error(`${provider} login failed. Please ensure ${provider} is enabled in Supabase settings.`);
      }
    } catch (error: any) {
      console.error('OAuth error:', error);
      toast.error('An error occurred during social login');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  const { language } = useLanguage();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F1EB' }}>
      {/* Hero */}
      <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#121212' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 text-sm"
            style={{ color: '#E3DCD3' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(166, 143, 89, 0.1)', border: '1px solid #A68F59' }}>
              <Sparkles className="w-4 h-4" style={{ color: '#A68F59' }} />
              <span className="text-sm tracking-wide" style={{ color: '#A68F59' }}>Secure Access</span>
            </div>

            <h1 className="text-4xl md:text-5xl mb-4" style={{ color: '#F5F1EB' }}>
              {mode === 'login' ? 'Welcome Back' : 'Join the CREOVA Family'}
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#E3DCD3' }}>
              {mode === 'login'
                ? 'Sign in to access your membership, SEEN collection, and exclusive community benefits'
                : 'Free to join — get community access, SEEN app early entry, and exclusive member perks'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Member Benefits Strip — show on signup to motivate sign-up */}
      {mode === 'signup' && (
        <div className="py-6 px-4" style={{ backgroundColor: '#2C2C2C' }}>
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-xs tracking-widest uppercase mb-5" style={{ color: '#A68F59' }}>
              What you unlock with a free account
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Users className="w-5 h-5" />, label: 'Community Membership', sub: 'Profile + community feed' },
                { icon: <Smartphone className="w-5 h-5" />, label: 'SEEN App Access', sub: 'Early waitlist access' },
                { icon: <Palette className="w-5 h-5" />, label: 'SEEN Collection', sub: 'Browse all artist drops' },
                { icon: <Tag className="w-5 h-5" />, label: 'Member Discounts', sub: 'Upgrade anytime for deals' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <span style={{ color: '#A68F59' }}>{item.icon}</span>
                  <div>
                    <p className="text-xs font-medium" style={{ color: '#F5F1EB' }}>{item.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#7A6F66' }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Auth Form */}
      <section className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white rounded-2xl shadow-xl p-8">
              {/* Mode Toggle */}
              <div className="flex gap-2 mb-8">
                <Button
                  onClick={() => setMode('login')}
                  variant={mode === 'login' ? 'default' : 'outline'}
                  className="flex-1"
                  style={mode === 'login' ? { backgroundColor: '#121212', color: '#F5F1EB' } : {}}
                >
                  Login
                </Button>
                <Button
                  onClick={() => setMode('signup')}
                  variant={mode === 'signup' ? 'default' : 'outline'}
                  className="flex-1"
                  style={mode === 'signup' ? { backgroundColor: '#121212', color: '#F5F1EB' } : {}}
                >
                  Sign Up
                </Button>
              </div>

              {/* OAuth Providers */}
              <div className="space-y-3 mb-6">
                <Button
                  onClick={() => handleOAuthLogin('google')}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-3"
                >
                  <Mail className="w-5 h-5" />
                  Continue with Google
                </Button>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    onClick={() => handleOAuthLogin('facebook')}
                    variant="outline"
                    className="flex items-center justify-center"
                  >
                    <Mail className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={() => handleOAuthLogin('github')}
                    variant="outline"
                    className="flex items-center justify-center"
                  >
                    <Mail className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={() => handleOAuthLogin('apple')}
                    variant="outline"
                    className="flex items-center justify-center"
                  >
                    <Mail className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: '#E3DCD3' }}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white" style={{ color: '#7A6F66' }}>Or continue with email</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#7A6F66' }} />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#7A6F66' }} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#7A6F66' }} />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: '#7A6F66' }}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {mode === 'signup' && passwordStrength && formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full transition-all duration-300"
                            style={{ 
                              width: `${passwordStrength.strength}%`,
                              backgroundColor: passwordStrength.color
                            }}
                          />
                        </div>
                        <span className="text-xs" style={{ color: passwordStrength.color }}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: '#7A6F66' }}>
                        Use 8+ characters with uppercase, lowercase, numbers & symbols
                      </p>
                    </div>
                  )}
                </div>

                {mode === 'signup' && (
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#7A6F66' }} />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* CAPTCHA */}
                <div className="flex justify-center py-2">
                  <Captcha
                    onVerify={handleCaptchaVerify}
                    onExpire={handleCaptchaExpire}
                    onError={handleCaptchaError}
                    theme="light"
                    size="normal"
                  />
                </div>

                {/* Terms Agreement for Sign Up */}
                {mode === 'signup' && (
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      required
                    />
                    <Label htmlFor="terms" className="cursor-pointer text-sm leading-tight">
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={() => window.open('/terms-of-service', '_blank')}
                        className="underline"
                        style={{ color: '#A68F59' }}
                      >
                        Terms of Service
                      </button>
                      {' '}and{' '}
                      <button
                        type="button"
                        onClick={() => window.open('/privacy-policy', '_blank')}
                        className="underline"
                        style={{ color: '#A68F59' }}
                      >
                        Privacy Policy
                      </button>
                    </Label>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || !captchaToken}
                  className="w-full py-6 text-lg"
                  style={{ backgroundColor: '#121212', color: '#F5F1EB' }}
                >
                  {isLoading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                </Button>

                {/* Forgot Password */}
                {mode === 'login' && (
                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm underline"
                      style={{ color: '#A68F59' }}
                      onClick={() => toast.info('Password reset functionality coming soon')}
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}
              </form>

              {/* Security Notice */}
              <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(166, 143, 89, 0.1)' }}>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#A68F59' }} />
                  <div>
                    <p className="text-sm" style={{ color: '#121212' }}>
                      <strong>Your security matters to us</strong>
                    </p>
                    <p className="text-xs mt-1" style={{ color: '#7A6F66' }}>
                      All data is encrypted with bank-level security. We never share your information with third parties.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-sm" style={{ color: '#7A6F66' }}>
                {mode === 'login' 
                  ? "Don't have an account? " 
                  : "Already have an account? "}
                <button
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="underline"
                  style={{ color: '#A68F59' }}
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}