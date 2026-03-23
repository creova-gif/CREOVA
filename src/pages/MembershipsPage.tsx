import { useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';
import { Star, Crown, Check, Mail, Loader2 } from 'lucide-react';

export default function MembershipsPage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [selectedMembership, setSelectedMembership] = useState<'creator' | 'legacy' | null>(null);
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '' });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifySuccess, setNotifySuccess] = useState(false);

  const content = {
    en: {
      title: 'Memberships',
      subtitle: 'Join the CREOVA creative community',
      availableBadge: 'AVAILABLE NOW',
      notifyTitle: 'Stay Updated',
      notifyPlaceholder: 'Enter your email for updates',
      notifyButton: 'Subscribe',
      notifySuccess: '✓ You\'ll receive membership updates!',
      creator: {
        name: 'CREATOR',
        price: '$299',
        period: '/year',
        description: 'For creative professionals and entrepreneurs',
        features: [
          '20% off all CREOVA workshops & events',
          '15% off all SEEN collection products',
          'Exclusive monthly creator meetups',
          'Access to equipment rental discounts',
          'Free portfolio review (quarterly)',
          'Early access to new product drops',
          'Members-only resource library',
          'Priority booking for services',
          'CREOVA Creator digital badge'
        ]
      },
      legacy: {
        name: 'LEGACY',
        price: '$599',
        period: '/year',
        description: 'For established creatives building lasting impact',
        features: [
          'Everything in Creator membership',
          '30% off all workshops & events',
          '25% off all SEEN collection products',
          'Quarterly 1-on-1 mentorship sessions',
          'Free professional photoshoot (annual)',
          'Featured in CREOVA creator spotlight',
          'Access to exclusive networking events',
          'Complimentary equipment rental (2x/year)',
          'Co-marketing opportunities',
          'Lifetime archive of member work',
          'Legacy Member physical badge & certificate'
        ]
      },
      joinNow: 'Subscribe Now',
      checkoutTitle: 'Complete Your Membership',
      checkoutDescription: 'Enter your details to start your annual membership subscription',
      nameLabel: 'Full Name',
      emailLabel: 'Email Address',
      cancel: 'Cancel',
      proceed: 'Proceed to Payment'
    },
    fr: {
      title: 'Adhésions',
      subtitle: 'Rejoignez la communauté créative CREOVA',
      availableBadge: 'DISPONIBLE MAINTENANT',
      notifyTitle: 'Restez Informé',
      notifyPlaceholder: 'Entrez votre courriel pour les mises à jour',
      notifyButton: 'S\'abonner',
      notifySuccess: '✓ Vous recevrez les mises à jour d\'adhésion!',
      creator: {
        name: 'CRÉATEUR',
        price: '299$',
        period: '/an',
        description: 'Pour les professionnels créatifs et entrepreneurs',
        features: [
          '20% de rabais sur tous les ateliers et événements CREOVA',
          '15% de rabais sur tous les produits de la collection SEEN',
          'Rencontres mensuelles exclusives de créateurs',
          'Accès aux rabais de location d\'équipement',
          'Révision de portfolio gratuite (trimestrielle)',
          'Accès anticipé aux nouveaux produits',
          'Bibliothèque de ressources réservée aux membres',
          'Réservation prioritaire pour les services',
          'Badge numérique CREOVA Créateur'
        ]
      },
      legacy: {
        name: 'HÉRITAGE',
        price: '599$',
        period: '/an',
        description: 'Pour les créatifs établis construisant un impact durable',
        features: [
          'Tout dans l\'adhésion Créateur',
          '30% de rabais sur tous les ateliers et événements',
          '25% de rabais sur tous les produits de la collection SEEN',
          'Séances de mentorat 1-à-1 trimestrielles',
          'Séance photo professionnelle gratuite (annuelle)',
          'Mise en vedette dans le spotlight des créateurs CREOVA',
          'Accès à des événements de réseautage exclusifs',
          'Location d\'équipement gratuite (2x/an)',
          'Opportunités de co-marketing',
          'Archive à vie du travail des membres',
          'Badge physique et certificat Membre Héritage'
        ]
      },
      joinNow: 'S\'abonner',
      checkoutTitle: 'Complétez Votre Adhésion',
      checkoutDescription: 'Entrez vos détails pour commencer votre abonnement annuel',
      nameLabel: 'Nom Complet',
      emailLabel: 'Adresse Courriel',
      cancel: 'Annuler',
      proceed: 'Procéder au Paiement'
    }
  };

  const t = content[language];

  const handleNotifyMe = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-feacf0d8/notify-me`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: notifyEmail,
          type: 'membership_updates',
          item_id: 'all'
        })
      });

      if (response.ok) {
        setNotifySuccess(true);
        setNotifyEmail('');
        setTimeout(() => setNotifySuccess(false), 5000);
        toast.success('Subscribed to membership updates!');
      }
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
      toast.error('Failed to subscribe');
    }
  };

  const handleSelectMembership = (type: 'creator' | 'legacy') => {
    setSelectedMembership(type);
    setShowCheckoutDialog(true);
    setCustomerInfo({ name: '', email: '' });
  };

  const handleProceedToPayment = async () => {
    if (!customerInfo.name || !customerInfo.email) {
      toast.error('Please enter your name and email');
      return;
    }

    if (!selectedMembership) {
      toast.error('Please select a membership tier');
      return;
    }

    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-feacf0d8/create-subscription-checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            membership_type: selectedMembership,
            customer_email: customerInfo.email,
            customer_name: customerInfo.name
          })
        }
      );

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to start checkout. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          variant={language === 'en' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setLanguage('en')}
          className="bg-[#121212] text-[#F5F1EB] hover:bg-[#B1643B]"
        >
          EN
        </Button>
        <Button
          variant={language === 'fr' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setLanguage('fr')}
          className="bg-[#121212] text-[#F5F1EB] hover:bg-[#B1643B]"
        >
          FR
        </Button>
      </div>

      {/* Hero Section */}
      <div className="bg-[#121212] text-[#F5F1EB] py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block bg-[#B1643B] text-[#F5F1EB] px-4 py-2 rounded-full mb-6">
            {t.availableBadge}
          </div>
          <h1 className="text-5xl md:text-7xl mb-6">{t.title}</h1>
          <p className="text-xl text-[#E3DCD3] max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </div>

      {/* Notify Me Section */}
      <div className="py-12 px-4 bg-[#E3DCD3]">
        <div className="max-w-md mx-auto text-center">
          <Mail className="w-12 h-12 mx-auto mb-4 text-[#B1643B]" />
          <h3 className="text-2xl mb-4 text-[#121212]">{t.notifyTitle}</h3>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder={t.notifyPlaceholder}
              value={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleNotifyMe}
              className="bg-[#121212] text-[#F5F1EB] hover:bg-[#B1643B]"
            >
              {t.notifyButton}
            </Button>
          </div>
          {notifySuccess && (
            <p className="mt-3 text-[#A68F59]">{t.notifySuccess}</p>
          )}
        </div>
      </div>

      {/* Membership Tiers */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm mb-8" style={{ color: '#7A6F66' }}>
            * All prices in CAD. 13% GST/HST (Ontario) applies to all memberships.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Creator Membership */}
            <Card className="p-8 border-2 border-[#A68F59] bg-white hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-8 h-8 text-[#A68F59]" />
                <h2 className="text-3xl">{t.creator.name}</h2>
              </div>
              <div className="mb-6">
                <span className="text-5xl">{t.creator.price}</span>
                <span className="text-xl text-gray-600">{t.creator.period}</span>
              </div>
              <p className="text-gray-600 mb-8">{t.creator.description}</p>
              
              <ul className="space-y-3 mb-8">
                {t.creator.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#A68F59] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSelectMembership('creator')}
                className="w-full bg-[#A68F59] text-[#F5F1EB] hover:bg-[#B1643B] py-6 text-lg"
              >
                {t.joinNow}
              </Button>
            </Card>

            {/* Legacy Membership */}
            <Card className="p-8 border-2 border-[#B1643B] bg-white hover:shadow-2xl transition-shadow relative">
              <div className="absolute top-4 right-4 bg-[#B1643B] text-[#F5F1EB] px-3 py-1 rounded-full text-sm">
                PREMIUM
              </div>
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-8 h-8 text-[#B1643B]" />
                <h2 className="text-3xl">{t.legacy.name}</h2>
              </div>
              <div className="mb-6">
                <span className="text-5xl">{t.legacy.price}</span>
                <span className="text-xl text-gray-600">{t.legacy.period}</span>
              </div>
              <p className="text-gray-600 mb-8">{t.legacy.description}</p>
              
              <ul className="space-y-3 mb-8">
                {t.legacy.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#B1643B] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSelectMembership('legacy')}
                className="w-full bg-[#B1643B] text-[#F5F1EB] hover:bg-[#121212] py-6 text-lg"
              >
                {t.joinNow}
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="bg-[#121212] text-[#F5F1EB] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl mb-6">
            {language === 'en' ? 'Join the Creative Community' : 'Rejoignez la Communauté Créative'}
          </h2>
          <p className="text-xl text-[#E3DCD3] mb-8">
            {language === 'en' 
              ? 'Connect with fellow BIPOC creatives, access exclusive resources, and build your legacy with CREOVA.'
              : 'Connectez-vous avec d\'autres créatifs BIPOC, accédez à des ressources exclusives et construisez votre héritage avec CREOVA.'
            }
          </p>
        </div>
      </div>

      {/* Checkout Dialog */}
      <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl" style={{ color: '#121212' }}>
              {t.checkoutTitle}
            </DialogTitle>
            <DialogDescription style={{ color: '#7A6F66' }}>
              {t.checkoutDescription}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">{t.nameLabel}</Label>
              <Input
                id="name"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                placeholder="John Doe"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">{t.emailLabel}</Label>
              <Input
                id="email"
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                placeholder="john@example.com"
                className="mt-2"
              />
            </div>

            {selectedMembership && (
              <div className="bg-[#F5F1EB] p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium" style={{ color: '#121212' }}>
                    {selectedMembership === 'creator' ? t.creator.name : t.legacy.name} Membership
                  </span>
                  <span className="text-xl" style={{ color: '#B1643B' }}>
                    {selectedMembership === 'creator' ? t.creator.price : t.legacy.price}
                    <span className="text-sm text-gray-600">{t.creator.period}</span>
                  </span>
                </div>
              </div>
            )}

            {/* Terms and Privacy Agreement */}
            <div className="flex items-start gap-3 pt-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                required
              />
              <div>
                <Label htmlFor="terms" className="cursor-pointer text-sm" style={{ color: '#121212' }}>
                  {language === 'en' ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      J'accepte les{' '}
                      <button
                        type="button"
                        onClick={() => window.open('/terms-of-service', '_blank')}
                        className="underline"
                        style={{ color: '#A68F59' }}
                      >
                        Conditions d'utilisation
                      </button>
                      {' '}et la{' '}
                      <button
                        type="button"
                        onClick={() => window.open('/privacy-policy', '_blank')}
                        className="underline"
                        style={{ color: '#A68F59' }}
                      >
                        Politique de confidentialité
                      </button>
                    </>
                  )}
                </Label>
                <p className="text-xs mt-1" style={{ color: '#7A6F66' }}>
                  {language === 'en' 
                    ? 'Required for subscription. Your membership will auto-renew annually.' 
                    : 'Requis pour l\'abonnement. Votre adhésion se renouvelle automatiquement chaque année.'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowCheckoutDialog(false)}
              disabled={isProcessing}
              className="flex-1"
            >
              {t.cancel}
            </Button>
            <Button
              onClick={handleProceedToPayment}
              disabled={isProcessing}
              className="flex-1 bg-[#121212] text-[#F5F1EB] hover:bg-[#B1643B]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                t.proceed
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}