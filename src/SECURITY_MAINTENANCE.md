# CREOVA Security Maintenance Guide

This document provides a comprehensive checklist and procedures for ongoing security maintenance of the CREOVA web application.

## Table of Contents
1. [Monthly Security Tasks](#monthly-security-tasks)
2. [Quarterly Security Tasks](#quarterly-security-tasks)
3. [Annual Security Tasks](#annual-security-tasks)
4. [Emergency Response](#emergency-response)
5. [Security Audit Checklist](#security-audit-checklist)

---

## Monthly Security Tasks

### 1. Dependency Updates & Vulnerability Scanning

**Task**: Check for outdated packages and security vulnerabilities

```bash
# Check for outdated packages
npm outdated

# Check for known vulnerabilities
npm audit

# Fix vulnerabilities automatically (if safe)
npm audit fix

# For packages requiring manual review
npm audit fix --force  # Use with caution!

# Alternative: Use Snyk for deeper scanning
npx snyk test
```

**Action Items**:
- [ ] Review npm audit report
- [ ] Update packages with security fixes
- [ ] Test application after updates
- [ ] Document any breaking changes
- [ ] Deploy updated dependencies to production

### 2. Review Access Logs

**Task**: Monitor for suspicious activity

- [ ] Review Supabase Edge Function logs for:
  - Failed authentication attempts (>5 from same IP)
  - Rate limit violations
  - Unusual payment patterns
  - API errors and exceptions
  - Suspicious user behavior

**Where to Check**:
- Supabase Dashboard > Edge Functions > Logs
- Look for error patterns or unusual traffic spikes

**Red Flags**:
- Multiple failed logins from different IPs (credential stuffing)
- Sudden spike in traffic from single IP
- Payment attempts with similar patterns
- Excessive API calls to specific endpoints

### 3. Password Rotation (Admin Accounts)

**Task**: Update admin passwords and API keys

- [ ] Rotate admin account passwords
- [ ] Check for any shared/default passwords
- [ ] Ensure all admins have 2FA enabled
- [ ] Review admin access list (remove former employees)

### 4. Backup Verification

**Task**: Verify backups are working

- [ ] Check Supabase automatic backups are running
- [ ] Test restoration of a backup (in development environment)
- [ ] Export critical data manually (monthly archive)
- [ ] Store backup copy in separate location

**Export Commands**:
```bash
# Export database using Supabase CLI
supabase db dump -f backup-$(date +%Y-%m-%d).sql

# Or use the Database Access page to export key-value data
```

---

## Quarterly Security Tasks

### 1. Comprehensive Security Audit

**Task**: Full security review

- [ ] Review all security headers (CSP, HSTS, etc.)
- [ ] Test rate limiting on all endpoints
- [ ] Verify CAPTCHA is working on all forms
- [ ] Check SSL certificate expiration
- [ ] Review CORS configuration
- [ ] Test authentication flows
- [ ] Verify OAuth providers are configured correctly
- [ ] Review Stripe webhook signatures

### 2. Penetration Testing

**Task**: Security testing (can use automated tools or hire professionals)

**Free Tools**:
```bash
# OWASP ZAP (Zed Attack Proxy)
# Download from: https://www.zaproxy.org/

# Or use online scanners:
# - Mozilla Observatory: https://observatory.mozilla.org/
# - Security Headers: https://securityheaders.com/
# - SSL Labs: https://www.ssllabs.com/ssltest/
```

**Test Areas**:
- [ ] SQL injection attempts
- [ ] XSS (Cross-Site Scripting) attacks
- [ ] CSRF (Cross-Site Request Forgery)
- [ ] Authentication bypass attempts
- [ ] Rate limiting effectiveness
- [ ] File upload vulnerabilities (if applicable)
- [ ] API endpoint security

### 3. Access Control Review

**Task**: Review and update access controls

- [ ] Audit all admin accounts
- [ ] Review Supabase Row Level Security (RLS) policies
- [ ] Check JWT token expiration settings
- [ ] Verify protected routes are actually protected
- [ ] Test member-only content access
- [ ] Review API key permissions

### 4. Update Security Documentation

**Task**: Keep security docs current

- [ ] Update SECURITY.md with any changes
- [ ] Review and update Privacy Policy if needed
- [ ] Review and update Terms of Service if needed
- [ ] Document any security incidents and resolutions
- [ ] Update incident response procedures

### 5. API Key Rotation

**Task**: Rotate sensitive API keys

- [ ] Generate new Stripe API keys
- [ ] Update hCaptcha site keys
- [ ] Rotate database credentials (if custom setup)
- [ ] Update webhook secrets
- [ ] Test application with new keys before switching

**Rotation Procedure**:
1. Generate new keys in provider dashboard
2. Add new keys to Supabase Secrets (keep old ones temporarily)
3. Deploy updated application
4. Monitor for errors
5. Remove old keys after 24-48 hours

---

## Annual Security Tasks

### 1. Professional Security Audit

**Recommended**: Hire a professional security firm for annual penetration testing

**Budget**: $2,000 - $10,000 depending on scope

**Providers**:
- [Secureworks](https://www.secureworks.com/)
- [Rapid7](https://www.rapid7.com/)
- [HackerOne Bug Bounty](https://www.hackerone.com/) (ongoing)

### 2. Legal Compliance Review

**Task**: Ensure all legal documents are current

- [ ] Review Privacy Policy for PIPEDA compliance
- [ ] Review Terms of Service
- [ ] Check data retention policies are being followed
- [ ] Verify user data deletion requests are handled properly
- [ ] Review cookie consent implementation
- [ ] Update "Last Modified" dates on legal pages

### 3. Disaster Recovery Testing

**Task**: Full disaster recovery drill

- [ ] Simulate complete server failure
- [ ] Test backup restoration process
- [ ] Verify recovery time objectives (RTO)
- [ ] Test emergency communication plan
- [ ] Document lessons learned
- [ ] Update disaster recovery plan

### 4. Infrastructure Review

**Task**: Review hosting and infrastructure

- [ ] Review Supabase plan and limits
- [ ] Check for any deprecated features
- [ ] Review CDN configuration
- [ ] Verify SSL/TLS version compliance
- [ ] Check for any end-of-life dependencies
- [ ] Plan for major version upgrades

### 5. Security Training

**Task**: Train team on security best practices

**Topics**:
- [ ] Phishing awareness
- [ ] Password security
- [ ] Secure coding practices
- [ ] Incident response procedures
- [ ] Data handling and privacy
- [ ] Social engineering defense

---

## Emergency Response

### Suspected Security Breach

**Immediate Actions**:

1. **Contain**:
   - [ ] Disable affected user accounts
   - [ ] Revoke compromised API keys
   - [ ] Enable maintenance mode if needed
   - [ ] Document everything

2. **Investigate**:
   - [ ] Check Supabase logs for breach timeline
   - [ ] Identify compromised data
   - [ ] Determine attack vector
   - [ ] Assess scope of breach

3. **Notify**:
   - [ ] Inform affected users within 72 hours (PIPEDA requirement)
   - [ ] Report to Privacy Commissioner (if required)
   - [ ] Notify payment processor (Stripe)
   - [ ] Inform insurance company

4. **Remediate**:
   - [ ] Patch vulnerability
   - [ ] Reset all passwords
   - [ ] Rotate all API keys
   - [ ] Deploy security fixes
   - [ ] Monitor for further attacks

5. **Post-Incident**:
   - [ ] Conduct post-mortem
   - [ ] Update security procedures
   - [ ] Implement additional safeguards
   - [ ] Document lessons learned

### Data Breach Notification Template

```
Subject: Important Security Notice - CREOVA Data Incident

Dear [Name],

We are writing to inform you of a security incident that may have affected your personal information.

What Happened:
[Brief description of the incident]

What Information Was Involved:
[List of data types: email, name, etc. - NEVER include passwords]

What We Are Doing:
- Secured our systems
- Conducting thorough investigation
- Enhanced security measures
- [Other actions taken]

What You Should Do:
- Change your password immediately
- Monitor your accounts for suspicious activity
- Enable two-factor authentication
- [Other recommendations]

We sincerely apologize for this incident and any inconvenience it may cause.

For questions, contact: security@creova.ca

Sincerely,
CREOVA Security Team
```

---

## Security Audit Checklist

### Authentication & Authorization

- [ ] Password hashing using bcrypt (min cost factor 10)
- [ ] Session tokens are JWT with reasonable expiration
- [ ] 2FA available for admin accounts
- [ ] OAuth providers configured correctly
- [ ] Failed login attempts are rate limited
- [ ] Account lockout after 5 failed attempts
- [ ] Password reset flow is secure
- [ ] Email verification working properly

### Data Protection

- [ ] All data encrypted in transit (HTTPS/TLS)
- [ ] All data encrypted at rest (Supabase)
- [ ] PII is properly protected
- [ ] Payment data never stored locally
- [ ] API keys stored as environment variables
- [ ] Database credentials not exposed
- [ ] Sensitive data is logged securely (no passwords in logs)

### API Security

- [ ] Rate limiting enabled on all endpoints
- [ ] CAPTCHA on public forms
- [ ] Input validation on server-side
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (input sanitization)
- [ ] CSRF protection implemented
- [ ] Webhook signatures verified (Stripe)

### Infrastructure Security

- [ ] HTTPS enforced (HSTS header)
- [ ] Security headers configured (CSP, X-Frame-Options, etc.)
- [ ] CORS properly configured (not too permissive)
- [ ] Dependencies up to date
- [ ] No known vulnerabilities (npm audit)
- [ ] Firewall rules configured
- [ ] DDoS protection in place

### Privacy & Compliance

- [ ] Privacy Policy updated and accessible
- [ ] Terms of Service updated and accessible
- [ ] Cookie consent implemented
- [ ] PIPEDA compliance verified
- [ ] Data retention policy followed
- [ ] User data deletion process works
- [ ] Marketing opt-out process works

### Monitoring & Logging

- [ ] All API requests logged
- [ ] Failed auth attempts logged
- [ ] Payment transactions logged
- [ ] Error tracking implemented
- [ ] Log retention policy defined
- [ ] Alerts configured for suspicious activity
- [ ] Regular log review process established

### Backup & Recovery

- [ ] Automated backups configured
- [ ] Backup testing conducted quarterly
- [ ] Offsite backup storage configured
- [ ] Disaster recovery plan documented
- [ ] Recovery time objective (RTO) defined
- [ ] Recovery point objective (RPO) defined

---

## Quick Reference: Security Contacts

### Internal
- **Security Lead**: [Your Email]
- **Development Team**: [Team Email]
- **Legal/Compliance**: [Legal Contact]

### External
- **Supabase Support**: https://supabase.com/support
- **Stripe Support**: https://support.stripe.com/
- **hCaptcha Support**: support@hcaptcha.com
- **Canadian Privacy Commissioner**: 1-800-282-1376
- **Emergency Security**: security@creova.ca

---

## Tools & Resources

### Security Scanning Tools
- **npm audit**: Built-in vulnerability scanner
- **Snyk**: https://snyk.io/ (Comprehensive security platform)
- **OWASP ZAP**: https://www.zaproxy.org/ (Penetration testing)
- **Lighthouse**: Chrome DevTools (Security audit)

### Online Security Checkers
- **Mozilla Observatory**: https://observatory.mozilla.org/
- **Security Headers**: https://securityheaders.com/
- **SSL Labs**: https://www.ssllabs.com/ssltest/
- **HaveIBeenPwned**: https://haveibeenpwned.com/ (Check for breaches)

### Learning Resources
- **OWASP Top 10**: https://owasp.org/www-project-top-ten/
- **Supabase Security**: https://supabase.com/docs/guides/auth/security
- **Stripe Security**: https://stripe.com/docs/security
- **PIPEDA Guide**: https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | Nov 18, 2024 | Initial security maintenance guide | CREOVA Dev Team |

---

**Next Review Date**: February 18, 2025

**Document Owner**: CREOVA Security Team  
**Last Updated**: November 18, 2024
