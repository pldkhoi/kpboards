import i18n from 'i18next';
// config
import { defaultLang } from '@/config';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

//
import arLocales from './ar';
import cnLocales from './cn';
import enLocales from './en';
import frLocales from './fr';
import vnLocales from './vn';

// ----------------------------------------------------------------------

const detectedLanguage =
  typeof window !== 'undefined' ? window.localStorage.getItem('i18nextLng') : null;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      fr: { translations: frLocales },
      vn: { translations: vnLocales },
      cn: { translations: cnLocales },
      ar: { translations: arLocales },
    },
    lng: detectedLanguage ?? defaultLang.value,
    fallbackLng: defaultLang.value,
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
