import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
//import LanguageDetector from 'i18next-react-native-language-detector';

import en_common from './locales/en/common.json';
import en_about_app from './locales/en/AboutApp.json';
import en_navigation from './locales/en/navigation.json';

import pl_common from './locales/pl/common.json';
import pl_about_app from './locales/pl/AboutApp.json';
import pl_navigation from './locales/pl/navigation.json';

i18n
//  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    ns: ['common', 'about_app', 'navigation'],
    defaultNS: 'common',
    resources: {
      en: {
        common: en_common,
        about_app: en_about_app,
        navigation: en_navigation,
      },
      pl: {
        common: pl_common,
        about_app: pl_about_app,
        navigation: pl_navigation,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
