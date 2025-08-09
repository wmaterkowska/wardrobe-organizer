import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
//import LanguageDetector from 'i18next-react-native-language-detector';

import en_common from './locales/en/common.json';
import en_about_app from './locales/en/AboutApp.json';
import en_navigation from './locales/en/navigation.json';
import en_insights from './locales/en/insights.json'
import en_properties from './locales/en/properties.json'

import pl_common from './locales/pl/common.json';
import pl_about_app from './locales/pl/AboutApp.json';
import pl_navigation from './locales/pl/navigation.json';
import pl_insights from './locales/pl/insights.json'
import pl_properties from './locales/pl/properties.json'

i18n
//  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    ns: ['common', 'about_app', 'navigation', 'insights', 'properties'],
    defaultNS: 'common',
    resources: {
      en: {
        common: en_common,
        about_app: en_about_app,
        navigation: en_navigation,
        insights: en_insights,
        properties: en_properties,
      },
      pl: {
        common: pl_common,
        about_app: pl_about_app,
        navigation: pl_navigation,
        insights: pl_insights,
        properties: pl_properties,
      },
    },
    interpolation: {
      escapeValue: false,
    },
    keySeparator: false,
    pluralSeparator: '_',
  });

export default i18n;
