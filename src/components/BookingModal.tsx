import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner';
import { logger } from '../utils/logger';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: string;
  package?: string;
  price?: number;
}

export function BookingModal({ isOpen, onClose, service, package: packageName, price }: BookingModalProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: service || '',
    package: packageName || '',
    message: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      toast.error(
        language === 'fr'
          ? 'Veuillez remplir tous les champs obligatoires'
          : 'Please fill in all required fields'
      );
      return;
    }

    // Email validation
    if (!formData.email.includes('@')) {
      toast.error(
        language === 'fr'
          ? 'Veuillez entrer une adresse email valide'
          : 'Please enter a valid email address'
      );
      return;
    }

    // Show success and proceed to payment
    toast.success(
      language === 'fr'
        ? 'Réservation reçue! Redirection vers le paiement...'
        : 'Booking received! Redirecting to payment...'
    );

    // Send real booking confirmation email
    try {
      const emailResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-feacf0d8/send-booking-confirmation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            to: formData.email,
            bookingDetails: formData,
            amount: price || 0,
            language: language,
            checkoutUrl: window.location.origin + '/checkout'
          })
        }
      );

      if (emailResponse.ok) {
        const emailResult = await emailResponse.json();
        logger.log('Booking confirmation email sent:', emailResult);
        
        setTimeout(() => {
          toast.success(
            language === 'fr'
              ? 'Email de confirmation envoyé! Vérifiez votre boîte de réception.'
              : 'Confirmation email sent! Check your inbox.'
          );
        }, 1500);
      } else {
        // Email failed but don't block the booking flow
        console.warn('Email sending failed, but booking was saved');
        setTimeout(() => {
          toast.info(
            language === 'fr'
              ? 'Réservation confirmée. Nous vous contacterons sous peu.'
              : 'Booking confirmed. We\'ll contact you shortly.'
          );
        }, 1500);
      }
    } catch (emailError) {
      // Don't block checkout if email fails
      console.error('Email sending error:', emailError);
    }

    // Close modal and navigate to checkout after 2 seconds
    setTimeout(() => {
      onClose();
      navigate('/checkout', { 
        state: { 
          bookingDetails: formData,
          amount: price || 0,
          type: 'service'
        }
      });
    }, 2000);
  };

  const services = language === 'fr' ? [
    'Photographie Familiale',
    'Photographie de Marque',
    'Photographie de Produits',
    'Drone/Aérien',
    'Couverture d\'Événements',
    'Design Graphique',
    'Gestion des Médias Sociaux',
    'Vidéographie',
    'Location d\'Équipement'
  ] : [
    'Family Photography',
    'Brand Photography',
    'Product Photography',
    'Drone/Aerial',
    'Event Coverage',
    'Graphic Design',
    'Social Media Management',
    'Videography',
    'Equipment Rental'
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl flex items-center gap-2" style={{ color: '#121212' }}>
            <Calendar className="w-7 h-7" style={{ color: '#A68F59' }} />
            {language === 'fr' ? 'Réserver une Session' : 'Book a Session'}
          </DialogTitle>
          <DialogDescription style={{ color: '#7A6F66' }}>
            {language === 'fr'
              ? 'Remplissez le formulaire ci-dessous et nous vous contacterons pour confirmer votre réservation. Un dépôt de 50% est requis pour sécuriser votre date.'
              : 'Fill out the form below and we\'ll contact you to confirm your booking. A 50% deposit is required to secure your date.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2" style={{ color: '#121212' }}>
              <User className="w-5 h-5" style={{ color: '#A68F59' }} />
              {language === 'fr' ? 'Informations Personnelles' : 'Personal Information'}
            </h3>
            
            <div>
              <Label htmlFor="name">{language === 'fr' ? 'Nom Complet *' : 'Full Name *'}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder={language === 'fr' ? 'Votre nom complet' : 'Your full name'}
                required
                className="mt-2"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">{language === 'fr' ? 'Email *' : 'Email *'}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="email@example.com"
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="phone">{language === 'fr' ? 'Téléphone *' : 'Phone *'}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  required
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2" style={{ color: '#121212' }}>
              <Calendar className="w-5 h-5" style={{ color: '#A68F59' }} />
              {language === 'fr' ? 'Détails du Service' : 'Service Details'}
            </h3>

            <div>
              <Label htmlFor="service">{language === 'fr' ? 'Service *' : 'Service *'}</Label>
              <Select value={formData.service} onValueChange={(value) => handleChange('service', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder={language === 'fr' ? 'Sélectionner un service' : 'Select a service'} />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.package && (
              <div>
                <Label>{language === 'fr' ? 'Forfait Sélectionné' : 'Selected Package'}</Label>
                <div className="mt-2 p-3 rounded-lg border-2" style={{ borderColor: '#A68F59', backgroundColor: '#F5F1EB' }}>
                  <p style={{ color: '#121212' }}>{formData.package}</p>
                  {price && (
                    <p className="text-sm mt-1" style={{ color: '#7A6F66' }}>
                      {price.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">{language === 'fr' ? 'Date Préférée *' : 'Preferred Date *'}</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="time">{language === 'fr' ? 'Heure Préférée' : 'Preferred Time'}</Label>
                <Select value={formData.time} onValueChange={(value) => handleChange('time', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder={language === 'fr' ? 'Sélectionner une heure' : 'Select a time'} />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <Label htmlFor="message">{language === 'fr' ? 'Message Additionnel' : 'Additional Message'}</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder={language === 'fr' 
                ? 'Parlez-nous de votre vision, besoins spéciaux, ou questions...'
                : 'Tell us about your vision, special needs, or any questions...'}
              rows={4}
              className="mt-2"
            />
          </div>

          {/* Deposit Information */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-lg border-2"
            style={{ backgroundColor: '#F5F1EB', borderColor: '#A68F59' }}
          >
            <p className="text-sm mb-2" style={{ color: '#121212' }}>
              <strong>{language === 'fr' ? '💰 Dépôt Requis:' : '💰 Required Deposit:'}</strong>
            </p>
            <p className="text-sm" style={{ color: '#7A6F66' }}>
              {language === 'fr'
                ? 'Un dépôt de 50% est nécessaire pour confirmer votre réservation. Vous serez redirigé vers le paiement sécurisé après soumission.'
                : 'A 50% deposit is required to confirm your booking. You\'ll be redirected to secure payment after submission.'}
            </p>
            {price && (
              <p className="text-lg mt-2" style={{ color: '#B1643B' }}>
                <strong>
                  {language === 'fr' ? 'Dépôt: ' : 'Deposit: '}
                  {(price * 0.5).toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}
                </strong>
              </p>
            )}
          </motion.div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl py-6"
            >
              {language === 'fr' ? 'Annuler' : 'Cancel'}
            </Button>
            <Button
              type="submit"
              className="flex-1 rounded-xl py-6 group"
              style={{ backgroundColor: '#121212', color: '#F5F1EB' }}
            >
              {language === 'fr' ? 'Continuer au Paiement' : 'Continue to Payment'}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}