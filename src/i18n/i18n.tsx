import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import enUsTrans from './en.json';
import zhCnTrans from './zh.json';

import { initReactI18next } from 'react-i18next';

i18n.use(LanguageDetector)
    .use(initReactI18next) //init i18next
    .init({
        resources: {
            en: {
                translation: enUsTrans,
            },
            zh: {
                translation: zhCnTrans,
            },
        },
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;
