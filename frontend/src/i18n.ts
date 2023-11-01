import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "pl",
  fallbackLng: "pl",
  interpolation: { escapeValue: false }, // React does it by default so it is not needed
  resources: {
    en: {
      translation: {
        welcomeTitle: "Hello!",
      },
    },
    pl: {
      translation: {
        welcomeTitle: "Witaj!",
      },
    },
  },
});

export default i18n;
