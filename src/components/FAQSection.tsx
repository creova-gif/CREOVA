import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  description?: string;
  faqs: FAQItem[];
  variant?: 'light' | 'dark';
}

export function FAQSection({ 
  title = "Frequently Asked Questions",
  description,
  faqs,
  variant = 'light'
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const colors = {
    light: {
      bg: '#FFFFFF',
      border: '#E3DCD3',
      text: '#121212',
      subtext: '#7A6F66',
      accent: '#A68F59',
      hoverBg: '#F5F1EB'
    },
    dark: {
      bg: '#121212',
      border: '#2A2A2A',
      text: '#F5F1EB',
      subtext: '#E3DCD3',
      accent: '#A68F59',
      hoverBg: 'rgba(166, 143, 89, 0.1)'
    }
  };

  const theme = colors[variant];

  return (
    <section className="py-20" style={{ backgroundColor: variant === 'light' ? '#F5F1EB' : '#0F0F0F' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" 
               style={{ backgroundColor: `${theme.accent}15`, border: `1px solid ${theme.accent}30` }}>
            <HelpCircle className="w-4 h-4" style={{ color: theme.accent }} />
            <span className="text-sm tracking-wide font-medium" style={{ color: theme.accent }}>HAVE QUESTIONS?</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: theme.text }}>
            {title}
          </h2>
          {description && (
            <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.subtext }}>
              {description}
            </p>
          )}
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl border-2 overflow-hidden transition-all duration-300"
              style={{ 
                backgroundColor: theme.bg,
                borderColor: openIndex === index ? theme.accent : theme.border
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:opacity-80 transition-opacity"
                style={{ backgroundColor: openIndex === index ? theme.hoverBg : 'transparent' }}
              >
                <h3 className="text-lg font-semibold pr-8" style={{ color: theme.text }}>
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5" style={{ color: theme.accent }} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-2">
                      <p className="leading-relaxed" style={{ color: theme.subtext }}>
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center p-8 rounded-2xl border-2"
          style={{ 
            backgroundColor: theme.hoverBg,
            borderColor: theme.border
          }}
        >
          <h3 className="text-xl font-semibold mb-3" style={{ color: theme.text }}>
            Still have questions?
          </h3>
          <p className="mb-5" style={{ color: theme.subtext }}>
            We're here to help! Reach out to our team for personalized assistance.
          </p>
          <a
            href="mailto:support@creova.ca"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg"
            style={{ 
              backgroundColor: '#121212',
              color: '#F5F1EB'
            }}
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
}
