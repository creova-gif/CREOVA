import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';
import { Button } from './ui/button';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4" style={{ color: '#121212' }} />
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLanguage('en')}
          className="h-8 px-2 text-xs tracking-wider transition-all"
          style={{
            backgroundColor: language === 'en' ? '#121212' : 'transparent',
            color: language === 'en' ? '#F5F1EB' : '#121212',
            fontWeight: language === 'en' ? '600' : '400'
          }}
        >
          EN
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLanguage('fr')}
          className="h-8 px-2 text-xs tracking-wider transition-all"
          style={{
            backgroundColor: language === 'fr' ? '#121212' : 'transparent',
            color: language === 'fr' ? '#F5F1EB' : '#121212',
            fontWeight: language === 'fr' ? '600' : '400'
          }}
        >
          FR
        </Button>
      </div>
    </div>
  );
}
