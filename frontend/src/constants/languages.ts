import polishFlag from "../assets/polish-flag.png";
import englishFlag from "../assets/english-flag.png";

export const BACKEND_LANGUAGES_CODES = {
  english: "ENG",
  polish: "PL",
};

export const LANGUAGES = [
  {
    label: "Polski",
    code: "pl",
    flagIcon: polishFlag,
    backendCode: BACKEND_LANGUAGES_CODES.polish,
  },
  {
    label: "English",
    code: "en",
    flagIcon: englishFlag,
    backendCode: BACKEND_LANGUAGES_CODES.english,
  },
];
