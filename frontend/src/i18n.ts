import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "./locale/en_translations";
import plTranslations from "./locale/pl_translations";

const resources = {
  en: enTranslations,
  pl: plTranslations,
};

i18n.use(initReactI18next).init({
  lng: "pl",
  fallbackLng: "pl",
  interpolation: { escapeValue: false }, // React does it by default so it is not needed
  resources,
});

export default i18n;
