import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./vocabularies/en.json";
import ka from "./vocabularies/ka.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ka: { translation: ka },
  },
  lng: "en",
  fallbackLng: "en",
});
