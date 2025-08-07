import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
//import LanguageDetector from 'i18next-react-native-language-detector';

import en_common from './locales/en/common.json';
import en_about_view from './locales/en/AboutView.json';
import pl_common from './locales/pl/common.json';
import pl_about_view from './locales/pl/AboutView.json';

i18n
//  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    ns: ['about_view','common'],
    // defaultNS: 'common',
    resources: {
      en: {
        about_view: en_about_view,
        common: en_common,
      },
      pl: {
        about_view: pl_about_view,
        common: pl_common
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
